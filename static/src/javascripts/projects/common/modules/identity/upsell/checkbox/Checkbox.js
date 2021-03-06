// @flow
import React from 'preact-compat';

type CheckboxHtmlProps = {
    checked: ?boolean,
    onChange: (ev: Event) => void,
};

type CheckboxProps = {
    title: string,
    subtitle: ?string,
    checkboxHtmlProps: CheckboxHtmlProps,
};

const Checkbox = ({ title, subtitle, checkboxHtmlProps }: CheckboxProps) => (
    <label
        data-link-name={`upsell-consent : checkbox : ${title} : ${
            checkboxHtmlProps.checked ? 'untick' : 'tick'
        }`}
        className="identity-upsell-checkbox"
        htmlFor={title}>
        <span className="identity-upsell-checkbox__title">{title}</span>
        {subtitle && <span>{subtitle}</span>}
        <input type="checkbox" id={title} {...checkboxHtmlProps} />
        <span className="identity-upsell-checkbox__checkmark">
            <span className="identity-upsell-checkbox__checkmark_tick" />
        </span>
    </label>
);

export { Checkbox };
