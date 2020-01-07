import * as Yup from 'yup';

const alpha = /^[a-zA-Z_]+$/;

const validation = Yup.object().shape({
    firstName: Yup.string()
        .matches(alpha, { message: "enter valid name", excludeEmptyString: true })
        .required()
        .max(35),
    lastName: Yup.string()
        .matches(alpha, { message: "enter valid name", excludeEmptyString: true })
        .required()
        .max(35),
    address: Yup.string()
        .matches(alpha, { message: "enter valid name", excludeEmptyString: true })
        .required(),
    city: Yup.string()
        .matches(alpha, { message: "enter valid name", excludeEmptyString: true })
        .required(),
    ocuppation: Yup.string()
        .test("ocuppation", "ocuppation cannot be empty", value => value !== 'Please select')
        .required('required'),
    message: Yup.string()
        .required('required'),
    terms: Yup.string()
        .test('terms', 'you must agree to terms', value => value.length > 0)
        .required('required')
});

export default validation;