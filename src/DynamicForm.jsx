import React, { Fragment } from 'react';
import './App.css';
import { Formik, Field } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import { 
    TextField, 
    FormHelperText, 
    FormControl, 
    TextareaAutosize, 
    Select,
    MenuItem,
    Button
} from '@material-ui/core';

const styles = theme => ({
    textField: {
      marginTop: theme.spacing(1),
      width: 200
    },
    textArea: {
        width: 200
    },
    select: {
        marginTop: theme.spacing(1),
        width: 200
    }
});

class DynamicForm extends React.Component {

    constructor(props) {
        super(props);

        this.renderFields = this.renderFields.bind(this);
        this.renderText = this.renderText.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
        this.renderCheckbox = this.renderCheckbox.bind(this);
        this.renderTextArea = this.renderTextArea.bind(this);
    }

    renderFields(inputs) {
        return (
            inputs.map(input => {

                const components = {
                    'select': this.renderSelect,
                    'textarea': this.renderTextArea,
                    'checkbox': this.renderCheckbox
                };

                const callback = components[input.type];

                return callback ? callback(input) : this.renderText(input);
            })
        );
    }

    renderText(input) {
        const classes = this.props.classes;
        return (
            <Fragment key={input.name}>
                <div>
                    <Field 
                        name={input.name}
                        render={(props) => {
                            const { field } = props;
                            const { errors, touched } = props.form;
                            const hasError = errors[input.name] && touched[input.name];
                            return (
                                <FormControl error={hasError}>
                                    <TextField 
                                        {... field}
                                        className={classes.textField}
                                        variant="outlined"
                                        label={input.label}
                                        margin="dense"
                                    />
                                    {hasError && <FormHelperText>{errors[input.name]}</FormHelperText>}
                                </FormControl>
                            );
                        }}
                    />
                </div>
            </Fragment>
        );
    }

    renderSelect(input) {
        const classes = this.props.classes;
        return (
            <Fragment key={input.name}>
                <div>
                    <Field 
                        name={input.name}
                        render={(props) => {
                            const { field } = props;
                            const { errors, touched } = props.form;
                            const hasError = errors[input.name] && touched[input.name];
                            const defaultOption = <MenuItem key="default" value="Please select">Please Select</MenuItem>
                            const options = input.data.map(i => <MenuItem key={i} value={i}> {i} </MenuItem> );
                            const selectOptions = [defaultOption, ...options];
                            return (
                                <FormControl error={hasError}>
                                    {console.log(field.value)}
                                    <Select 
                                        {...field} 
                                        value={field.value ? field.value : 'Please select'}
                                        className={classes.select}
                                        displayEmpty
                                        margin="dense"
                                        variant="outlined"
                                    >
                                        {selectOptions}
                                    </Select>
                                    {hasError && <FormHelperText>{errors[input.name]}</FormHelperText>}
                                </FormControl>
                            );
                        }}
                    />
                </div>
            </Fragment>
        );
    }

    renderCheckbox(input) {
        return (
            <Fragment key={input.name}>
                <label>{input.label}</label>
                <Field 
                    name={input.name}
                    render={(props) => {
                        const { field } = props;
                        const { errors, touched } = props.form;
                        const hasError = errors[input.name] && touched[input.name];
                        return (
                            <FormControl error={hasError}>
                                <input 
                                    name={input.name}
                                    type="checkbox"
                                    checked={field.value.length > 0}
                                    onChange={field.onChange}
                                /><br />
                                {hasError && <FormHelperText>{errors[input.name]}</FormHelperText>}
                            </FormControl>
                        );
                    }}
                />
            </Fragment>
        );
    }

    renderTextArea(input) {
        const classes = this.props.classes;
        return (
            <Fragment key={input.name}>
                <label>{input.label}</label>
                <div>
                    <Field 
                        name={input.name}
                        render={(props) => {
                            const { field } = props;
                            const { errors, touched } = props.form;
                            const hasError = errors[input.name] && touched[input.name];

                            return (
                                <FormControl error={hasError}>
                                    <TextareaAutosize
                                        {...field}
                                        rowsMin={3}
                                        rowsMax={4}
                                        className={classes.textArea}
                                    />
                                    {hasError && <FormHelperText>{errors[input.name]}</FormHelperText>}
                                </FormControl>
                            );
                        }}
                    />
                </div>
            </Fragment>
        );
    }

    getInitialValues(inputs) {
        const initialValues = {};
        inputs.forEach(field => {
            if(!initialValues[field.name]) {
                initialValues[field.name] = field.value;
            }
        });

        return initialValues;
    }

    render() {
        const initialValues = this.getInitialValues(this.props.fields);
        return (
            <div className="app">
                <h1>Dynamic Form</h1>
                <Formik 
                    onSubmit={(values) => console.log(values)}
                    validationSchema={this.props.validation}
                    validateOnChange={true}
                    initialValues={initialValues}
                >
                    {form => (
                        <div>
                            <form onSubmit={form.handleSubmit}>
                                {/*<div className={errorMessageShow}>
                                    Please correct the errors below
                                </div>*/}
                                {this.renderFields(this.props.fields)}
                                <br /><br />
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </form>
                        </div>
                    )}
                </Formik>
            </div>
        );
    }
}

export default withStyles(styles)(DynamicForm);