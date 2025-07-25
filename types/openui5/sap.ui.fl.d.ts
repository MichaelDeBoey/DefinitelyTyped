// For Library Version: 1.138.0

declare module "sap/ui/fl/library" {}

declare module "sap/ui/fl/apply/api/ControlVariantApplyAPI" {
  import ManagedObject from "sap/ui/base/ManagedObject";

  /**
   * Provides an API for applications to work with control variants. See also {@link sap.ui.fl.variants.VariantManagement}.
   *
   * @since 1.67
   */
  interface ControlVariantApplyAPI {
    /**
     * Activates the passed variant applicable to the passed control/component. If the Variant is not available
     * and the backend supports lazy loading, a backend request is made to fetch the variant. If the flag standardVariant
     * is set to true, the standard variant is activated and the variantReference is ignored. In this scenario
     * the passed element must be the variant management control.
     *
     *
     * @returns Resolves after the variant is activated or rejects if an error occurs
     */
    activateVariant(
      /**
       * Object with parameters as properties
       */
      mPropertyBag: {
        /**
         * Component or control (instance or ID) on which the `variantModel` is set
         */
        element: ManagedObject | string;
        /**
         * Reference to the variant that needs to be activated
         */
        variantReference: string;
        /**
         * If set to true, the standard variant is activated and the variantReference is ignored
         */
        standardVariant?: boolean;
      }
    ): Promise<any>;
    /**
     * Saves a function that will be called after a variant has been applied with the new variant as parameter.
     * Even if the same variant is selected again the callback is called. The function also performs a sanity
     * check after the control has been rendered. If the passed variant control ID does not match the responsible
     * variant management control, the callback will not be saved. Optionally this function is also called after
     * the initial variant is applied without a sanity check.
     */
    attachVariantApplied(
      /**
       * Object with parameters as properties
       */
      mPropertyBag: {
        /**
         * Selector of the control
         */
        selector: /* was: sap.ui.fl.Selector */ any;
        /**
         * ID of the variant management control
         */
        vmControlId: string;
        /**
         * Callback that will be called after a variant has been applied
         */
        callback: Function;
        /**
         * The callback will also be called after the initial variant is applied
         */
        callAfterInitialVariant?: boolean;
      }
    ): void;
    /**
     * Clears URL technical parameter `sap-ui-fl-control-variant-id` for control variants. Use this method in
     * case you normally want the variant parameter in the URL, but have a few special navigation patterns where
     * you want to clear it. If you don't want that parameter in general, set the `updateVariantInURL` parameter
     * on your variant management control to `false`. SAP Fiori elements use this method. If a variant management
     * control is given as a parameter, only parameters specific to that control are cleared.
     */
    clearVariantParameterInURL(
      /**
       * Object with parameters as properties
       */
      mPropertyBag: {
        /**
         * Variant management control for which the URL technical parameter has to be cleared
         */
        control: ManagedObject;
      }
    ): void;
    /**
     * Removes the saved callback for the given control and variant management control.
     */
    detachVariantApplied(
      /**
       * Object with parameters as properties
       */
      mPropertyBag: {
        /**
         * Selector of the control
         */
        selector: /* was: sap.ui.fl.Selector */ any;
        /**
         * ID of the variant management control
         */
        vmControlId: string;
      }
    ): void;
  }
  const ControlVariantApplyAPI: ControlVariantApplyAPI;
  export default ControlVariantApplyAPI;
}

declare module "sap/ui/fl/transport/TransportDialog" {
  import { default as Dialog, $DialogSettings } from "sap/m/Dialog";

  import ElementMetadata from "sap/ui/core/ElementMetadata";

  /**
   * The Transport Dialog Control can be used to implement a value help for selecting an ABAP package and
   * transport request. It is not a generic utility, but part of the Variantmanament and therefore cannot
   * be used in any other application.
   *
   * @deprecated As of version 1.74. The TransportDialog should be used only internally inside the `sap.ui.fl`
   * library.
   */
  export default class TransportDialog extends Dialog {
    /**
     * Constructor for a new transport/TransportDialog.
     *
     * Accepts an object literal `mSettings` that defines initial property values, aggregated and associated
     * objects as well as event handlers. See {@link sap.ui.base.ManagedObject#constructor} for a general description
     * of the syntax of the settings object.
     *
     * This class does not have its own settings, but all settings applicable to the base type {@link sap.m.Dialog#constructor sap.m.Dialog }
     * can be used.
     */
    constructor(
      /**
       * initial settings for the new control
       */
      mSettings?: $TransportDialogSettings
    );
    /**
     * Constructor for a new transport/TransportDialog.
     *
     * Accepts an object literal `mSettings` that defines initial property values, aggregated and associated
     * objects as well as event handlers. See {@link sap.ui.base.ManagedObject#constructor} for a general description
     * of the syntax of the settings object.
     *
     * This class does not have its own settings, but all settings applicable to the base type {@link sap.m.Dialog#constructor sap.m.Dialog }
     * can be used.
     */
    constructor(
      /**
       * id for the new control, generated automatically if no id is given
       */
      sId?: string,
      /**
       * initial settings for the new control
       */
      mSettings?: $TransportDialogSettings
    );

    /**
     * Creates a new subclass of class sap.ui.fl.transport.TransportDialog with name `sClassName` and enriches
     * it with the information contained in `oClassInfo`.
     *
     * `oClassInfo` might contain the same kind of information as described in {@link sap.m.Dialog.extend}.
     *
     *
     * @returns Created class / constructor function
     */
    static extend<T extends Record<string, unknown>>(
      /**
       * Name of the class being created
       */
      sClassName: string,
      /**
       * Object literal with information about the class
       */
      oClassInfo?: sap.ClassInfo<T, TransportDialog>,
      /**
       * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
       * used by this class
       */
      FNMetaImpl?: Function
    ): Function;
    /**
     * Returns a metadata object for class sap.ui.fl.transport.TransportDialog.
     *
     *
     * @returns Metadata object describing this class
     */
    static getMetadata(): ElementMetadata;
  }
  /**
   * Describes the settings that can be provided to the TransportDialog constructor.
   *
   * @deprecated As of version 1.74. The TransportDialog should be used only internally inside the `sap.ui.fl`
   * library.
   */
  export interface $TransportDialogSettings extends $DialogSettings {}
}

declare module "sap/ui/fl/variants/VariantManagement" {
  import { default as Control, $ControlSettings } from "sap/ui/core/Control";

  import { IShrinkable, ID, TitleLevel, CSSSize } from "sap/ui/core/library";

  import {
    IOverflowToolbarContent,
    IToolbarInteractiveControl,
  } from "sap/m/library";

  import Event from "sap/ui/base/Event";

  import ElementMetadata from "sap/ui/core/ElementMetadata";

  import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";

  /**
   * Can be used to manage variants. You can use this control in most controls that are enabled for key
   * user adaptation.
   *  **Note: **On the user interface, variants are generally referred to as "views".
   *
   * @since 1.56
   */
  export default class VariantManagement
    extends Control
    implements IShrinkable, IOverflowToolbarContent, IToolbarInteractiveControl
  {
    __implements__sap_ui_core_IShrinkable: boolean;
    __implements__sap_m_IOverflowToolbarContent: boolean;
    __implements__sap_m_IToolbarInteractiveControl: boolean;
    /**
     * Constructor for a new `VariantManagement`.
     *
     * Accepts an object literal `mSettings` that defines initial property values, aggregated and associated
     * objects as well as event handlers. See {@link sap.ui.base.ManagedObject#constructor} for a general description
     * of the syntax of the settings object.
     * See:
     * 	{@link https://ui5.sap.com/#/topic/f1430c0337534d469da3a56307ff76af Key User Adaptation: Enable Your App}
     */
    constructor(
      /**
       * Initial settings for the new control
       */
      mSettings?: $VariantManagementSettings
    );
    /**
     * Constructor for a new `VariantManagement`.
     *
     * Accepts an object literal `mSettings` that defines initial property values, aggregated and associated
     * objects as well as event handlers. See {@link sap.ui.base.ManagedObject#constructor} for a general description
     * of the syntax of the settings object.
     * See:
     * 	{@link https://ui5.sap.com/#/topic/f1430c0337534d469da3a56307ff76af Key User Adaptation: Enable Your App}
     */
    constructor(
      /**
       * ID for the new control, generated automatically if no ID is given
       */
      sId?: string,
      /**
       * Initial settings for the new control
       */
      mSettings?: $VariantManagementSettings
    );

    /**
     * Creates a new subclass of class sap.ui.fl.variants.VariantManagement with name `sClassName` and enriches
     * it with the information contained in `oClassInfo`.
     *
     * `oClassInfo` might contain the same kind of information as described in {@link sap.ui.core.Control.extend}.
     *
     *
     * @returns Created class / constructor function
     */
    static extend<T extends Record<string, unknown>>(
      /**
       * Name of the class being created
       */
      sClassName: string,
      /**
       * Object literal with information about the class
       */
      oClassInfo?: sap.ClassInfo<T, VariantManagement>,
      /**
       * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
       * used by this class
       */
      FNMetaImpl?: Function
    ): Function;
    /**
     * Returns a metadata object for class sap.ui.fl.variants.VariantManagement.
     *
     *
     * @returns Metadata object describing this class
     */
    static getMetadata(): ElementMetadata;
    /**
     * Adds a control to the association {@link #for for}.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    addFor(
      /**
       * The control to add; if empty, nothing is inserted
       */
      vFor: ID | Control
    ): this;
    /**
     * Attaches event handler `fnFunction` to the {@link #event:cancel cancel} event of this `sap.ui.fl.variants.VariantManagement`.
     *
     * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
     * otherwise it will be bound to this `sap.ui.fl.variants.VariantManagement` itself.
     *
     * This event is fired when users press the Cancel button inside the Save As dialog.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    attachCancel(
      /**
       * An application-specific payload object that will be passed to the event handler along with the event
       * object when firing the event
       */
      oData: object,
      /**
       * The function to be called when the event occurs
       */
      fnFunction: (p1: Event) => void,
      /**
       * Context object to call the event handler with. Defaults to this `sap.ui.fl.variants.VariantManagement`
       * itself
       */
      oListener?: object
    ): this;
    /**
     * Attaches event handler `fnFunction` to the {@link #event:cancel cancel} event of this `sap.ui.fl.variants.VariantManagement`.
     *
     * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
     * otherwise it will be bound to this `sap.ui.fl.variants.VariantManagement` itself.
     *
     * This event is fired when users press the Cancel button inside the Save As dialog.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    attachCancel(
      /**
       * The function to be called when the event occurs
       */
      fnFunction: (p1: Event) => void,
      /**
       * Context object to call the event handler with. Defaults to this `sap.ui.fl.variants.VariantManagement`
       * itself
       */
      oListener?: object
    ): this;
    /**
     * Attaches event handler `fnFunction` to the {@link #event:initialized initialized} event of this `sap.ui.fl.variants.VariantManagement`.
     *
     * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
     * otherwise it will be bound to this `sap.ui.fl.variants.VariantManagement` itself.
     *
     * This event is fired when the model and context are set.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    attachInitialized(
      /**
       * An application-specific payload object that will be passed to the event handler along with the event
       * object when firing the event
       */
      oData: object,
      /**
       * The function to be called when the event occurs
       */
      fnFunction: (p1: Event) => void,
      /**
       * Context object to call the event handler with. Defaults to this `sap.ui.fl.variants.VariantManagement`
       * itself
       */
      oListener?: object
    ): this;
    /**
     * Attaches event handler `fnFunction` to the {@link #event:initialized initialized} event of this `sap.ui.fl.variants.VariantManagement`.
     *
     * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
     * otherwise it will be bound to this `sap.ui.fl.variants.VariantManagement` itself.
     *
     * This event is fired when the model and context are set.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    attachInitialized(
      /**
       * The function to be called when the event occurs
       */
      fnFunction: (p1: Event) => void,
      /**
       * Context object to call the event handler with. Defaults to this `sap.ui.fl.variants.VariantManagement`
       * itself
       */
      oListener?: object
    ): this;
    /**
     * Attaches event handler `fnFunction` to the {@link #event:manage manage} event of this `sap.ui.fl.variants.VariantManagement`.
     *
     * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
     * otherwise it will be bound to this `sap.ui.fl.variants.VariantManagement` itself.
     *
     * This event is fired when users apply changes to variants in the Manage Views dialog.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    attachManage(
      /**
       * An application-specific payload object that will be passed to the event handler along with the event
       * object when firing the event
       */
      oData: object,
      /**
       * The function to be called when the event occurs
       */
      fnFunction: (p1: VariantManagement$ManageEvent) => void,
      /**
       * Context object to call the event handler with. Defaults to this `sap.ui.fl.variants.VariantManagement`
       * itself
       */
      oListener?: object
    ): this;
    /**
     * Attaches event handler `fnFunction` to the {@link #event:manage manage} event of this `sap.ui.fl.variants.VariantManagement`.
     *
     * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
     * otherwise it will be bound to this `sap.ui.fl.variants.VariantManagement` itself.
     *
     * This event is fired when users apply changes to variants in the Manage Views dialog.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    attachManage(
      /**
       * The function to be called when the event occurs
       */
      fnFunction: (p1: VariantManagement$ManageEvent) => void,
      /**
       * Context object to call the event handler with. Defaults to this `sap.ui.fl.variants.VariantManagement`
       * itself
       */
      oListener?: object
    ): this;
    /**
     * Attaches event handler `fnFunction` to the {@link #event:save save} event of this `sap.ui.fl.variants.VariantManagement`.
     *
     * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
     * otherwise it will be bound to this `sap.ui.fl.variants.VariantManagement` itself.
     *
     * This event is fired when the Save View dialog or the Save As dialog is closed with the Save button.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    attachSave(
      /**
       * An application-specific payload object that will be passed to the event handler along with the event
       * object when firing the event
       */
      oData: object,
      /**
       * The function to be called when the event occurs
       */
      fnFunction: (p1: VariantManagement$SaveEvent) => void,
      /**
       * Context object to call the event handler with. Defaults to this `sap.ui.fl.variants.VariantManagement`
       * itself
       */
      oListener?: object
    ): this;
    /**
     * Attaches event handler `fnFunction` to the {@link #event:save save} event of this `sap.ui.fl.variants.VariantManagement`.
     *
     * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
     * otherwise it will be bound to this `sap.ui.fl.variants.VariantManagement` itself.
     *
     * This event is fired when the Save View dialog or the Save As dialog is closed with the Save button.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    attachSave(
      /**
       * The function to be called when the event occurs
       */
      fnFunction: (p1: VariantManagement$SaveEvent) => void,
      /**
       * Context object to call the event handler with. Defaults to this `sap.ui.fl.variants.VariantManagement`
       * itself
       */
      oListener?: object
    ): this;
    /**
     * Attaches event handler `fnFunction` to the {@link #event:select select} event of this `sap.ui.fl.variants.VariantManagement`.
     *
     * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
     * otherwise it will be bound to this `sap.ui.fl.variants.VariantManagement` itself.
     *
     * This event is fired when a new variant is selected.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    attachSelect(
      /**
       * An application-specific payload object that will be passed to the event handler along with the event
       * object when firing the event
       */
      oData: object,
      /**
       * The function to be called when the event occurs
       */
      fnFunction: (p1: VariantManagement$SelectEvent) => void,
      /**
       * Context object to call the event handler with. Defaults to this `sap.ui.fl.variants.VariantManagement`
       * itself
       */
      oListener?: object
    ): this;
    /**
     * Attaches event handler `fnFunction` to the {@link #event:select select} event of this `sap.ui.fl.variants.VariantManagement`.
     *
     * When called, the context of the event handler (its `this`) will be bound to `oListener` if specified,
     * otherwise it will be bound to this `sap.ui.fl.variants.VariantManagement` itself.
     *
     * This event is fired when a new variant is selected.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    attachSelect(
      /**
       * The function to be called when the event occurs
       */
      fnFunction: (p1: VariantManagement$SelectEvent) => void,
      /**
       * Context object to call the event handler with. Defaults to this `sap.ui.fl.variants.VariantManagement`
       * itself
       */
      oListener?: object
    ): this;
    /**
     * Detaches event handler `fnFunction` from the {@link #event:cancel cancel} event of this `sap.ui.fl.variants.VariantManagement`.
     *
     * The passed function and listener object must match the ones used for event registration.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    detachCancel(
      /**
       * The function to be called, when the event occurs
       */
      fnFunction: (p1: Event) => void,
      /**
       * Context object on which the given function had to be called
       */
      oListener?: object
    ): this;
    /**
     * Detaches event handler `fnFunction` from the {@link #event:initialized initialized} event of this `sap.ui.fl.variants.VariantManagement`.
     *
     * The passed function and listener object must match the ones used for event registration.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    detachInitialized(
      /**
       * The function to be called, when the event occurs
       */
      fnFunction: (p1: Event) => void,
      /**
       * Context object on which the given function had to be called
       */
      oListener?: object
    ): this;
    /**
     * Detaches event handler `fnFunction` from the {@link #event:manage manage} event of this `sap.ui.fl.variants.VariantManagement`.
     *
     * The passed function and listener object must match the ones used for event registration.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    detachManage(
      /**
       * The function to be called, when the event occurs
       */
      fnFunction: (p1: VariantManagement$ManageEvent) => void,
      /**
       * Context object on which the given function had to be called
       */
      oListener?: object
    ): this;
    /**
     * Detaches event handler `fnFunction` from the {@link #event:save save} event of this `sap.ui.fl.variants.VariantManagement`.
     *
     * The passed function and listener object must match the ones used for event registration.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    detachSave(
      /**
       * The function to be called, when the event occurs
       */
      fnFunction: (p1: VariantManagement$SaveEvent) => void,
      /**
       * Context object on which the given function had to be called
       */
      oListener?: object
    ): this;
    /**
     * Detaches event handler `fnFunction` from the {@link #event:select select} event of this `sap.ui.fl.variants.VariantManagement`.
     *
     * The passed function and listener object must match the ones used for event registration.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    detachSelect(
      /**
       * The function to be called, when the event occurs
       */
      fnFunction: (p1: VariantManagement$SelectEvent) => void,
      /**
       * Context object on which the given function had to be called
       */
      oListener?: object
    ): this;
    /**
     * Fires event {@link #event:cancel cancel} to attached listeners.
     *
     * @ui5-protected Do not call from applications (only from related classes in the framework)
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    fireCancel(
      /**
       * Parameters to pass along with the event
       */
      mParameters?: object
    ): this;
    /**
     * Fires event {@link #event:initialized initialized} to attached listeners.
     *
     * @ui5-protected Do not call from applications (only from related classes in the framework)
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    fireInitialized(
      /**
       * Parameters to pass along with the event
       */
      mParameters?: object
    ): this;
    /**
     * Fires event {@link #event:manage manage} to attached listeners.
     *
     * @ui5-protected Do not call from applications (only from related classes in the framework)
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    fireManage(
      /**
       * Parameters to pass along with the event
       */
      mParameters?: VariantManagement$ManageEventParameters
    ): this;
    /**
     * Fires event {@link #event:save save} to attached listeners.
     *
     * @ui5-protected Do not call from applications (only from related classes in the framework)
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    fireSave(
      /**
       * Parameters to pass along with the event
       */
      mParameters?: VariantManagement$SaveEventParameters
    ): this;
    /**
     * Fires event {@link #event:select select} to attached listeners.
     *
     * @ui5-protected Do not call from applications (only from related classes in the framework)
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    fireSelect(
      /**
       * Parameters to pass along with the event
       */
      mParameters?: VariantManagement$SelectEventParameters
    ): this;
    /**
     * Gets the currently selected variant key.
     *
     *
     * @returns Key of the currently selected variant. In case the model is not yet set `null` will be returned
     */
    getCurrentVariantKey(): string | null;
    /**
     * Gets current value of property {@link #getDisplayTextForExecuteOnSelectionForStandardVariant displayTextForExecuteOnSelectionForStandardVariant}.
     *
     * Defines the Apply Automatically text for the standard variant in the Manage Views dialog if the application
     * controls this behavior.  **Note:** The usage of this property is restricted to `sap.fe` components
     * only.
     *
     * Default value is `empty string`.
     *
     *
     * @returns Value of property `displayTextForExecuteOnSelectionForStandardVariant`
     */
    getDisplayTextForExecuteOnSelectionForStandardVariant(): string;
    /**
     * Gets current value of property {@link #getEditable editable}.
     *
     * Indicates whether the buttons on My Views are visible.
     *
     * Default value is `true`.
     *
     *
     * @returns Value of property `editable`
     */
    getEditable(): boolean;
    /**
     * Gets current value of property {@link #getExecuteOnSelectionForStandardDefault executeOnSelectionForStandardDefault}.
     *
     * Determines the behavior for Apply Automatically if the standard variant is marked as the default variant.
     *
     * Default value is `false`.
     *
     *
     * @returns Value of property `executeOnSelectionForStandardDefault`
     */
    getExecuteOnSelectionForStandardDefault(): boolean;
    /**
     * Returns array of IDs of the elements which are the current targets of the association {@link #getFor for}.
     */
    getFor(): ID[];
    /**
     * Gets current value of property {@link #getHeaderLevel headerLevel}.
     *
     * Semantic level of the header. For more information, see {@link sap.m.Title#setLevel}.
     *
     * Default value is `Auto`.
     *
     * @since 1.104
     *
     * @returns Value of property `headerLevel`
     */
    getHeaderLevel(): TitleLevel;
    /**
     * Gets current value of property {@link #getInErrorState inErrorState}.
     *
     * Indicates whether the control is in error state. If set to `true`, an error message will be displayed
     * when the variant is opened.
     *
     * Default value is `false`.
     *
     *
     * @returns Value of property `inErrorState`
     */
    getInErrorState(): boolean;
    /**
     * Gets current value of property {@link #getMaxWidth maxWidth}.
     *
     * Sets the maximum width of the control.
     *
     * Default value is `"100%"`.
     *
     * @since 1.109
     *
     * @returns Value of property `maxWidth`
     */
    getMaxWidth(): CSSSize;
    /**
     * Gets current value of property {@link #getModelName modelName}.
     *
     * The name of the model containing the data.
     *
     * Default value is `empty string`.
     *
     *
     * @returns Value of property `modelName`
     */
    getModelName(): string;
    /**
     * Determines whether the current variant is modified.
     *
     *
     * @returns Returns `true`, if the current variant is modified, otherwise `false`
     */
    getModified(): boolean;
    /**
     * Registers an invalidation event that is fired when the width of the control is changed. **Note:** This
     * is required by the {@link sap.m.IOverflowToolbarContent} interface.
     *
     * @ui5-protected Do not call from applications (only from related classes in the framework)
     *
     * @returns Configuration information for the {@link sap.m.IOverflowToolbarContent} interface
     */
    getOverflowToolbarConfig(): {
      canOverflow: boolean;

      invalidationEvents: string[];
    };
    /**
     * Gets current value of property {@link #getResetOnContextChange resetOnContextChange}.
     *
     * If set to `false`, it does not reset the `VariantManagement` control to the default variant if its binding
     * context is changed.  **Note:** The `VariantManagement` control itself is not affected by this property.
     * It is only used internally by the SAPUI5 flexibility layer.
     *
     * Default value is `true`.
     *
     *
     * @returns Value of property `resetOnContextChange`
     */
    getResetOnContextChange(): boolean;
    /**
     * Gets current value of property {@link #getShowSetAsDefault showSetAsDefault}.
     *
     * Indicates whether the functionality of setting a default variant is enabled. The Default column in Manage
     * Views and the Set as Default checkbox in Save View will be disabled if set to `false`.
     *
     * Default value is `true`.
     *
     *
     * @returns Value of property `showSetAsDefault`
     */
    getShowSetAsDefault(): boolean;
    /**
     * Gets current value of property {@link #getTitleStyle titleStyle}.
     *
     * Defines the style of the title. For more information, see {@link sap.m.Title#setTitleStyle}.
     *
     * Default value is `Auto`.
     *
     * @since 1.109
     *
     * @returns Value of property `titleStyle`
     */
    getTitleStyle(): TitleLevel;
    /**
     * Gets current value of property {@link #getUpdateVariantInURL updateVariantInURL}.
     *
     * Indicates whether the current variant is updated based on the passed information in the URL.  **Note:**
     * The `VariantManagement` control itself is not affected by this property. It is only used internally by
     * the SAPUI5 flexibility layer.
     *
     * Default value is `false`.
     *
     *
     * @returns Value of property `updateVariantInURL`
     */
    getUpdateVariantInURL(): boolean;
    /**
     * Gets all variants.
     *
     *
     * @returns All variants; if the model is not yet set, an empty array will be returned.
     */
    getVariants(): any[];
    /**
     * Removes all the controls in the association named {@link #getFor for}.
     *
     *
     * @returns An array of the removed elements (might be empty)
     */
    removeAllFor(): ID[];
    /**
     * Removes an for from the association named {@link #getFor for}.
     *
     *
     * @returns The removed for or `null`
     */
    removeFor(
      /**
       * The for to be removed or its index or ID
       */
      vFor: int | ID | Control
    ): ID | null;
    /**
     * Sets the new selected variant.
     */
    setCurrentVariantKey(
      /**
       * Key of the variant that is selected
       */
      sKey: string
    ): void;
    /**
     * Sets a new value for property {@link #getDisplayTextForExecuteOnSelectionForStandardVariant displayTextForExecuteOnSelectionForStandardVariant}.
     *
     * Defines the Apply Automatically text for the standard variant in the Manage Views dialog if the application
     * controls this behavior.  **Note:** The usage of this property is restricted to `sap.fe` components
     * only.
     *
     * When called with a value of `null` or `undefined`, the default value of the property will be restored.
     *
     * Default value is `empty string`.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    setDisplayTextForExecuteOnSelectionForStandardVariant(
      /**
       * New value for property `displayTextForExecuteOnSelectionForStandardVariant`
       */
      sDisplayTextForExecuteOnSelectionForStandardVariant?: string
    ): this;
    /**
     * Sets a new value for property {@link #getEditable editable}.
     *
     * Indicates whether the buttons on My Views are visible.
     *
     * When called with a value of `null` or `undefined`, the default value of the property will be restored.
     *
     * Default value is `true`.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    setEditable(
      /**
       * New value for property `editable`
       */
      bEditable?: boolean
    ): this;
    /**
     * Sets a new value for property {@link #getExecuteOnSelectionForStandardDefault executeOnSelectionForStandardDefault}.
     *
     * Determines the behavior for Apply Automatically if the standard variant is marked as the default variant.
     *
     * When called with a value of `null` or `undefined`, the default value of the property will be restored.
     *
     * Default value is `false`.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    setExecuteOnSelectionForStandardDefault(
      /**
       * New value for property `executeOnSelectionForStandardDefault`
       */
      bExecuteOnSelectionForStandardDefault?: boolean
    ): this;
    /**
     * Sets a new value for property {@link #getHeaderLevel headerLevel}.
     *
     * Semantic level of the header. For more information, see {@link sap.m.Title#setLevel}.
     *
     * When called with a value of `null` or `undefined`, the default value of the property will be restored.
     *
     * Default value is `Auto`.
     *
     * @since 1.104
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    setHeaderLevel(
      /**
       * New value for property `headerLevel`
       */
      sHeaderLevel?: TitleLevel | keyof typeof TitleLevel
    ): this;
    /**
     * Sets a new value for property {@link #getInErrorState inErrorState}.
     *
     * Indicates whether the control is in error state. If set to `true`, an error message will be displayed
     * when the variant is opened.
     *
     * When called with a value of `null` or `undefined`, the default value of the property will be restored.
     *
     * Default value is `false`.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    setInErrorState(
      /**
       * New value for property `inErrorState`
       */
      bInErrorState?: boolean
    ): this;
    /**
     * Sets a new value for property {@link #getMaxWidth maxWidth}.
     *
     * Sets the maximum width of the control.
     *
     * When called with a value of `null` or `undefined`, the default value of the property will be restored.
     *
     * Default value is `"100%"`.
     *
     * @since 1.109
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    setMaxWidth(
      /**
       * New value for property `maxWidth`
       */
      sMaxWidth?: CSSSize
    ): this;
    /**
     * Sets a new value for property {@link #getModelName modelName}.
     *
     * The name of the model containing the data.
     *
     * When called with a value of `null` or `undefined`, the default value of the property will be restored.
     *
     * Default value is `empty string`.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    setModelName(
      /**
       * New value for property `modelName`
       */
      sModelName?: string
    ): this;
    /**
     * Sets a new value for property {@link #getResetOnContextChange resetOnContextChange}.
     *
     * If set to `false`, it does not reset the `VariantManagement` control to the default variant if its binding
     * context is changed.  **Note:** The `VariantManagement` control itself is not affected by this property.
     * It is only used internally by the SAPUI5 flexibility layer.
     *
     * When called with a value of `null` or `undefined`, the default value of the property will be restored.
     *
     * Default value is `true`.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    setResetOnContextChange(
      /**
       * New value for property `resetOnContextChange`
       */
      bResetOnContextChange?: boolean
    ): this;
    /**
     * Sets a new value for property {@link #getShowSetAsDefault showSetAsDefault}.
     *
     * Indicates whether the functionality of setting a default variant is enabled. The Default column in Manage
     * Views and the Set as Default checkbox in Save View will be disabled if set to `false`.
     *
     * When called with a value of `null` or `undefined`, the default value of the property will be restored.
     *
     * Default value is `true`.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    setShowSetAsDefault(
      /**
       * New value for property `showSetAsDefault`
       */
      bShowSetAsDefault?: boolean
    ): this;
    /**
     * Sets a new value for property {@link #getTitleStyle titleStyle}.
     *
     * Defines the style of the title. For more information, see {@link sap.m.Title#setTitleStyle}.
     *
     * When called with a value of `null` or `undefined`, the default value of the property will be restored.
     *
     * Default value is `Auto`.
     *
     * @since 1.109
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    setTitleStyle(
      /**
       * New value for property `titleStyle`
       */
      sTitleStyle?: TitleLevel | keyof typeof TitleLevel
    ): this;
    /**
     * Sets a new value for property {@link #getUpdateVariantInURL updateVariantInURL}.
     *
     * Indicates whether the current variant is updated based on the passed information in the URL.  **Note:**
     * The `VariantManagement` control itself is not affected by this property. It is only used internally by
     * the SAPUI5 flexibility layer.
     *
     * When called with a value of `null` or `undefined`, the default value of the property will be restored.
     *
     * Default value is `false`.
     *
     *
     * @returns Reference to `this` in order to allow method chaining
     */
    setUpdateVariantInURL(
      /**
       * New value for property `updateVariantInURL`
       */
      bUpdateVariantInURL?: boolean
    ): this;
  }
  /**
   * Describes the settings that can be provided to the VariantManagement constructor.
   */
  export interface $VariantManagementSettings extends $ControlSettings {
    /**
     * Indicates whether the current variant is updated based on the passed information in the URL.  **Note:**
     * The `VariantManagement` control itself is not affected by this property. It is only used internally by
     * the SAPUI5 flexibility layer.
     */
    updateVariantInURL?: boolean | PropertyBindingInfo | `{${string}}`;

    /**
     * If set to `false`, it does not reset the `VariantManagement` control to the default variant if its binding
     * context is changed.  **Note:** The `VariantManagement` control itself is not affected by this property.
     * It is only used internally by the SAPUI5 flexibility layer.
     */
    resetOnContextChange?: boolean | PropertyBindingInfo | `{${string}}`;

    /**
     * The name of the model containing the data.
     */
    modelName?: string | PropertyBindingInfo;

    /**
     * Indicates whether the buttons on My Views are visible.
     */
    editable?: boolean | PropertyBindingInfo | `{${string}}`;

    /**
     * Indicates whether the functionality of setting a default variant is enabled. The Default column in Manage
     * Views and the Set as Default checkbox in Save View will be disabled if set to `false`.
     */
    showSetAsDefault?: boolean | PropertyBindingInfo | `{${string}}`;

    /**
     * Indicates whether the control is in error state. If set to `true`, an error message will be displayed
     * when the variant is opened.
     */
    inErrorState?: boolean | PropertyBindingInfo | `{${string}}`;

    /**
     * Determines the behavior for Apply Automatically if the standard variant is marked as the default variant.
     */
    executeOnSelectionForStandardDefault?:
      | boolean
      | PropertyBindingInfo
      | `{${string}}`;

    /**
     * Defines the Apply Automatically text for the standard variant in the Manage Views dialog if the application
     * controls this behavior.  **Note:** The usage of this property is restricted to `sap.fe` components
     * only.
     */
    displayTextForExecuteOnSelectionForStandardVariant?:
      | string
      | PropertyBindingInfo;

    /**
     * Semantic level of the header. For more information, see {@link sap.m.Title#setLevel}.
     *
     * @since 1.104
     */
    headerLevel?:
      | (TitleLevel | keyof typeof TitleLevel)
      | PropertyBindingInfo
      | `{${string}}`;

    /**
     * Defines the style of the title. For more information, see {@link sap.m.Title#setTitleStyle}.
     *
     * @since 1.109
     */
    titleStyle?:
      | (TitleLevel | keyof typeof TitleLevel)
      | PropertyBindingInfo
      | `{${string}}`;

    /**
     * Sets the maximum width of the control.
     *
     * @since 1.109
     */
    maxWidth?: CSSSize | PropertyBindingInfo | `{${string}}`;

    /**
     * Contains the IDs of the relevant controls for which the variant management is used.
     */
    for?: Array<Control | string>;

    /**
     * This event is fired when the model and context are set.
     */
    initialized?: (oEvent: Event) => void;

    /**
     * This event is fired when the Save View dialog or the Save As dialog is closed with the Save button.
     */
    save?: (oEvent: VariantManagement$SaveEvent) => void;

    /**
     * This event is fired when users press the Cancel button inside the Save As dialog.
     */
    cancel?: (oEvent: Event) => void;

    /**
     * This event is fired when users apply changes to variants in the Manage Views dialog.
     */
    manage?: (oEvent: VariantManagement$ManageEvent) => void;

    /**
     * This event is fired when a new variant is selected.
     */
    select?: (oEvent: VariantManagement$SelectEvent) => void;
  }

  /**
   * Parameters of the VariantManagement#cancel event.
   */
  export interface VariantManagement$CancelEventParameters {}

  /**
   * Event object of the VariantManagement#cancel event.
   */
  export type VariantManagement$CancelEvent = Event<
    VariantManagement$CancelEventParameters,
    VariantManagement
  >;

  /**
   * Parameters of the VariantManagement#initialized event.
   */
  export interface VariantManagement$InitializedEventParameters {}

  /**
   * Event object of the VariantManagement#initialized event.
   */
  export type VariantManagement$InitializedEvent = Event<
    VariantManagement$InitializedEventParameters,
    VariantManagement
  >;

  /**
   * Parameters of the VariantManagement#manage event.
   */
  export interface VariantManagement$ManageEventParameters {
    /**
     * List of changed variants. Each entry contains a `key` (the variant key) and a `name` (the new title of
     * the variant).
     */
    renamed?: object[];

    /**
     * List of deleted variant keys
     */
    deleted?: string[];

    /**
     * List of variant keys and the associated Execute on Selection indicator. Each entry contains a `key` (the
     * variant key) and an `exe` flag describing the intention.
     */
    exe?: object[];

    /**
     * List of variant keys and the associated favorite indicator. Each entry contains a `key` (the variant
     * key) and a `visible` flag describing the intention.
     */
    fav?: object[];

    /**
     * The default variant key
     */
    def?: string;

    /**
     * List of variant keys and the associated contexts array. Each entry contains a `key` (the variant key)
     * and a `contexts` array describing the contexts. **Note:** It is only used internally by the SAPUI5 flexibility
     * layer.
     */
    contexts?: object[];
  }

  /**
   * Event object of the VariantManagement#manage event.
   */
  export type VariantManagement$ManageEvent = Event<
    VariantManagement$ManageEventParameters,
    VariantManagement
  >;

  /**
   * Parameters of the VariantManagement#save event.
   */
  export interface VariantManagement$SaveEventParameters {
    /**
     * Variant title
     */
    name?: string;

    /**
     * Indicates whether an existing variant is overwritten or whether a new variant is created
     */
    overwrite?: boolean;

    /**
     * Variant key. This property is set if `overwrite` is set to `true`.
     */
    key?: string;

    /**
     * Apply Automatically indicator
     */
    execute?: boolean;

    /**
     * Indicates the checkbox state for Public
     */
    public?: boolean;

    /**
     * The default variant indicator
     */
    def?: boolean;

    /**
     * Array describing the contexts. **Note:** It is only used internally by the SAPUI5 flexibility layer.
     */
    contexts?: object[];

    /**
     * Indicates the checkbox state for Create Tile **Note:** This event parameter is used only internally.
     */
    tile?: boolean;
  }

  /**
   * Event object of the VariantManagement#save event.
   */
  export type VariantManagement$SaveEvent = Event<
    VariantManagement$SaveEventParameters,
    VariantManagement
  >;

  /**
   * Parameters of the VariantManagement#select event.
   */
  export interface VariantManagement$SelectEventParameters {
    /**
     * Variant key
     */
    key?: string;
  }

  /**
   * Event object of the VariantManagement#select event.
   */
  export type VariantManagement$SelectEvent = Event<
    VariantManagement$SelectEventParameters,
    VariantManagement
  >;
}

declare module "sap/ui/fl/write/_internal/fieldExtensibility/ABAPExtensibilityVariant" {
  import BaseObject from "sap/ui/base/Object";

  import Metadata from "sap/ui/base/Metadata";

  /**
   * Abstraction providing an API to handle an ABAP extension variant. Serves also as base class and dummy
   * implementation.
   *
   * @since 1.87
   */
  interface ABAPExtensibilityVariant extends BaseObject {
    /**
     * Creates a new subclass of class sap.ui.fl.write._internal.fieldExtensibility.ABAPExtensibilityVariant
     * with name `sClassName` and enriches it with the information contained in `oClassInfo`.
     *
     * `oClassInfo` might contain the same kind of information as described in {@link sap.ui.base.Object.extend}.
     *
     *
     * @returns Created class / constructor function
     */
    extend(
      /**
       * Name of the class being created
       */
      sClassName: string,
      /**
       * Object literal with information about the class
       */
      oClassInfo?: object,
      /**
       * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
       * used by this class
       */
      FNMetaImpl?: Function
    ): Function;
    /**
     * Returns a metadata object for class sap.ui.fl.write._internal.fieldExtensibility.ABAPExtensibilityVariant.
     *
     *
     * @returns Metadata object describing this class
     */
    getMetadata(): Metadata;
  }
  const ABAPExtensibilityVariant: ABAPExtensibilityVariant;
  export default ABAPExtensibilityVariant;
}

declare module "sap/ui/fl/write/_internal/fieldExtensibility/MultiTenantABAPExtensibilityVariant" {
  import ABAPExtensibilityVariant from "sap/ui/fl/write/_internal/fieldExtensibility/ABAPExtensibilityVariant";

  import Metadata from "sap/ui/base/Metadata";

  /**
   * Extension variant for ABAP multi tenant environments (via so called Predefined Fields)
   *
   * @since 1.87
   */
  interface MultiTenantABAPExtensibilityVariant
    extends ABAPExtensibilityVariant {
    /**
     * Creates a new subclass of class sap.ui.fl.write._internal.fieldExtensibility.MultiTenantABAPExtensibilityVariant
     * with name `sClassName` and enriches it with the information contained in `oClassInfo`.
     *
     * `oClassInfo` might contain the same kind of information as described in {@link sap.ui.fl.write._internal.fieldExtensibility.ABAPExtensibilityVariant.extend}.
     *
     *
     * @returns Created class / constructor function
     */
    extend(
      /**
       * Name of the class being created
       */
      sClassName: string,
      /**
       * Object literal with information about the class
       */
      oClassInfo?: object,
      /**
       * Constructor function for the metadata object; if not given, it defaults to the metadata implementation
       * used by this class
       */
      FNMetaImpl?: Function
    ): Function;
    /**
     * Returns a metadata object for class sap.ui.fl.write._internal.fieldExtensibility.MultiTenantABAPExtensibilityVariant.
     *
     *
     * @returns Metadata object describing this class
     */
    getMetadata(): Metadata;
  }
  const MultiTenantABAPExtensibilityVariant: MultiTenantABAPExtensibilityVariant;
  export default MultiTenantABAPExtensibilityVariant;
}

declare module "sap/ui/fl/write/_internal/fieldExtensibility/SingleTenantABAPExtensibilityVariant" {
  /**
   * Extension variant for ABAP single tenant environnments (via so called Custom Fields)
   *
   * @since 1.87
   */
  interface SingleTenantABAPExtensibilityVariant {}
  const SingleTenantABAPExtensibilityVariant: SingleTenantABAPExtensibilityVariant;
  export default SingleTenantABAPExtensibilityVariant;
}

declare module "sap/ui/fl/write/api/FeaturesAPI" {
  /**
   * Provides an API to determine which features are available for flexibility.
   *
   * @since 1.70
   */
  interface FeaturesAPI {
    /**
     * Checks if key user rights are available for the current user. Application developers can use this API
     * to decide if the key user adaptation feature should be visible to the current user. This only applies
     * if key user adaptation should be handled standalone without an SAP Fiori launchpad.
     *
     *
     * @returns Resolves to a boolean indicating if the key user role is assigned to the user
     */
    isKeyUser(): Promise<boolean>;
  }
  const FeaturesAPI: FeaturesAPI;
  export default FeaturesAPI;
}

declare namespace sap {
  interface IUI5DefineDependencyNames {
    "sap/ui/fl/apply/_internal/changes/descriptor/app/AddAnnotationsToOData": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/app/AddNewDataSource": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/app/AddNewInbound": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/app/AddNewOutbound": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/app/AddTechnicalAttributes": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/app/ChangeDataSource": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/app/ChangeInbound": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/app/ChangeOutbound": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/app/RemoveAllInboundsExceptOne": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/app/SetAch": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/app/SetDescription": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/app/SetTitle": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/fiori/SetAbstract": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/fiori/SetCloudDevAdaptationStatus": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/fiori/SetRegistrationIds": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/ovp/AddNewCard": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/ovp/ChangeCard": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/ovp/DeleteCard": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/Preprocessor": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/Registration": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/RegistrationBuild": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/ui5/AddComponentUsages": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/ui5/AddLibrary": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/ui5/AddNewModel": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/ui5/AddNewModelEnhanceWith": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/ui5/SetFlexExtensionPointEnabled": undefined;

    "sap/ui/fl/apply/_internal/changes/descriptor/ui5/SetMinUI5Version": undefined;

    "sap/ui/fl/apply/_internal/changes/Utils": undefined;

    "sap/ui/fl/apply/_internal/connectors/ObjectStorageConnector": undefined;

    "sap/ui/fl/apply/_internal/controlVariants/URLHandler": undefined;

    "sap/ui/fl/apply/_internal/extensionPoint/Registry": undefined;

    "sap/ui/fl/apply/_internal/flexObjects/AnnotationChange": undefined;

    "sap/ui/fl/apply/_internal/flexObjects/AppDescriptorChange": undefined;

    "sap/ui/fl/apply/_internal/flexObjects/CompVariant": undefined;

    "sap/ui/fl/apply/_internal/flexObjects/ControllerExtensionChange": undefined;

    "sap/ui/fl/apply/_internal/flexObjects/FlexObject": undefined;

    "sap/ui/fl/apply/_internal/flexObjects/FlexObjectFactory": undefined;

    "sap/ui/fl/apply/_internal/flexObjects/FlVariant": undefined;

    "sap/ui/fl/apply/_internal/flexObjects/UIChange": undefined;

    "sap/ui/fl/apply/_internal/flexObjects/UpdatableChange": undefined;

    "sap/ui/fl/apply/_internal/flexObjects/Variant": undefined;

    "sap/ui/fl/apply/_internal/flexObjects/VariantChange": undefined;

    "sap/ui/fl/apply/_internal/flexObjects/VariantManagementChange": undefined;

    "sap/ui/fl/apply/_internal/flexState/changes/DependencyHandler": undefined;

    "sap/ui/fl/apply/_internal/flexState/changes/ExtensionPointState": undefined;

    "sap/ui/fl/apply/_internal/flexState/changes/UIChangesState": undefined;

    "sap/ui/fl/apply/_internal/flexState/communication/FLPAboutInfo": undefined;

    "sap/ui/fl/apply/_internal/flexState/compVariants/CompVariantManagementState": undefined;

    "sap/ui/fl/apply/_internal/flexState/compVariants/CompVariantMerger": undefined;

    "sap/ui/fl/apply/_internal/flexState/controlVariants/Switcher": undefined;

    "sap/ui/fl/apply/_internal/flexState/controlVariants/VariantManagementState": undefined;

    "sap/ui/fl/apply/_internal/flexState/DataSelector": undefined;

    "sap/ui/fl/apply/_internal/flexState/FlexObjectState": undefined;

    "sap/ui/fl/apply/_internal/flexState/FlexState": undefined;

    "sap/ui/fl/apply/_internal/flexState/InitialPrepareFunctions": undefined;

    "sap/ui/fl/apply/_internal/flexState/Loader": undefined;

    "sap/ui/fl/apply/_internal/flexState/UI2Personalization/UI2PersonalizationState": undefined;

    "sap/ui/fl/apply/_internal/preprocessors/ComponentLifecycleHooks": undefined;

    "sap/ui/fl/apply/_internal/preprocessors/ControllerExtension": undefined;

    "sap/ui/fl/apply/api/AnnotationChangeHandlerAPI": undefined;

    "sap/ui/fl/apply/api/ControlVariantApplyAPI": undefined;

    "sap/ui/fl/apply/api/DelegateMediatorAPI": undefined;

    "sap/ui/fl/apply/api/ExtensionPointRegistryAPI": undefined;

    "sap/ui/fl/apply/api/FlexRuntimeInfoAPI": undefined;

    "sap/ui/fl/apply/api/SmartVariantManagementApplyAPI": undefined;

    "sap/ui/fl/apply/api/UI2PersonalizationApplyAPI": undefined;

    "sap/ui/fl/changeHandler/Base": undefined;

    "sap/ui/fl/changeHandler/BaseAddViaDelegate": undefined;

    "sap/ui/fl/changeHandler/BaseRename": undefined;

    "sap/ui/fl/descriptorRelated/api/DescriptorChange": undefined;

    "sap/ui/fl/descriptorRelated/api/DescriptorChangeFactory": undefined;

    "sap/ui/fl/descriptorRelated/api/DescriptorInlineChangeFactory": undefined;

    "sap/ui/fl/descriptorRelated/api/DescriptorVariantFactory": undefined;

    "sap/ui/fl/initial/_internal/connectors/BackendConnector": undefined;

    "sap/ui/fl/initial/_internal/connectors/BtpServiceConnector": undefined;

    "sap/ui/fl/initial/_internal/connectors/KeyUserConnector": undefined;

    "sap/ui/fl/initial/_internal/connectors/LrepConnector": undefined;

    "sap/ui/fl/initial/_internal/connectors/NeoLrepConnector": undefined;

    "sap/ui/fl/initial/_internal/connectors/PersonalizationConnector": undefined;

    "sap/ui/fl/initial/_internal/connectors/StaticFileConnector": undefined;

    "sap/ui/fl/initial/_internal/connectors/Utils": undefined;

    "sap/ui/fl/initial/_internal/Settings": undefined;

    "sap/ui/fl/initial/_internal/Storage": undefined;

    "sap/ui/fl/initial/_internal/StorageUtils": undefined;

    "sap/ui/fl/initial/api/InitialFlexAPI": undefined;

    "sap/ui/fl/interfaces/BaseLoadConnector": undefined;

    "sap/ui/fl/interfaces/Delegate": undefined;

    "sap/ui/fl/library": undefined;

    "sap/ui/fl/support/_internal/getAllUIChanges": undefined;

    "sap/ui/fl/support/_internal/getChangeDependencies": undefined;

    "sap/ui/fl/support/_internal/getFlexObjectInfos": undefined;

    "sap/ui/fl/support/_internal/getFlexSettings": undefined;

    "sap/ui/fl/support/api/SupportAPI": undefined;

    "sap/ui/fl/transport/TransportDialog": undefined;

    "sap/ui/fl/Utils": undefined;

    "sap/ui/fl/variants/context/Component": undefined;

    "sap/ui/fl/variants/VariantManagement": undefined;

    "sap/ui/fl/variants/VariantManager": undefined;

    "sap/ui/fl/variants/VariantModel": undefined;

    "sap/ui/fl/write/_internal/appVariant/AppVariant": undefined;

    "sap/ui/fl/write/_internal/appVariant/AppVariantFactory": undefined;

    "sap/ui/fl/write/_internal/appVariant/AppVariantInlineChange": undefined;

    "sap/ui/fl/write/_internal/appVariant/AppVariantInlineChangeFactory": undefined;

    "sap/ui/fl/write/_internal/connectors/BackendConnector": undefined;

    "sap/ui/fl/write/_internal/connectors/BtpServiceConnector": undefined;

    "sap/ui/fl/write/_internal/connectors/JsObjectConnector": undefined;

    "sap/ui/fl/write/_internal/connectors/KeyUserConnector": undefined;

    "sap/ui/fl/write/_internal/connectors/LocalStorageConnector": undefined;

    "sap/ui/fl/write/_internal/connectors/LrepConnector": undefined;

    "sap/ui/fl/write/_internal/connectors/NeoLrepConnector": undefined;

    "sap/ui/fl/write/_internal/connectors/ObjectPathConnector": undefined;

    "sap/ui/fl/write/_internal/connectors/ObjectStorageConnector": undefined;

    "sap/ui/fl/write/_internal/connectors/PersonalizationConnector": undefined;

    "sap/ui/fl/write/_internal/connectors/SessionStorageConnector": undefined;

    "sap/ui/fl/write/_internal/connectors/Utils": undefined;

    "sap/ui/fl/write/_internal/fieldExtensibility/ABAPExtensibilityVariant": undefined;

    "sap/ui/fl/write/_internal/fieldExtensibility/MultiTenantABAPExtensibilityVariant": undefined;

    "sap/ui/fl/write/_internal/fieldExtensibility/SingleTenantABAPExtensibilityVariant": undefined;

    "sap/ui/fl/write/_internal/flexState/changes/UIChangeManager": undefined;

    "sap/ui/fl/write/_internal/flexState/compVariants/CompVariantState": undefined;

    "sap/ui/fl/write/_internal/flexState/FlexObjectManager": undefined;

    "sap/ui/fl/write/_internal/flexState/UI2Personalization/UI2PersonalizationState": undefined;

    "sap/ui/fl/write/_internal/Storage": undefined;

    "sap/ui/fl/write/_internal/Versions": undefined;

    "sap/ui/fl/write/api/AppVariantWriteAPI": undefined;

    "sap/ui/fl/write/api/BusinessNetworkAPI": undefined;

    "sap/ui/fl/write/api/ChangesWriteAPI": undefined;

    "sap/ui/fl/write/api/connectors/ObjectStorageConnector": undefined;

    "sap/ui/fl/write/api/ContextBasedAdaptationsAPI": undefined;

    "sap/ui/fl/write/api/ContextSharingAPI": undefined;

    "sap/ui/fl/write/api/ControlPersonalizationWriteAPI": undefined;

    "sap/ui/fl/write/api/FeaturesAPI": undefined;

    "sap/ui/fl/write/api/FieldExtensibility": undefined;

    "sap/ui/fl/write/api/LocalResetAPI": undefined;

    "sap/ui/fl/write/api/PersistenceWriteAPI": undefined;

    "sap/ui/fl/write/api/ReloadInfoAPI": undefined;

    "sap/ui/fl/write/api/SmartBusinessWriteAPI": undefined;

    "sap/ui/fl/write/api/SmartVariantManagementWriteAPI": undefined;

    "sap/ui/fl/write/api/TranslationAPI": undefined;

    "sap/ui/fl/write/api/UI2PersonalizationWriteAPI": undefined;

    "sap/ui/fl/write/api/VersionsAPI": undefined;

    "sap/ui/fl/write/connectors/BaseConnector": undefined;
  }
}
