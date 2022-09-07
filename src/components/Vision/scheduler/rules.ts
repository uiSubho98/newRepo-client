const commonRules = (rule:string) => {
    return [
        {
            required: true,
            message: `Please input your ${rule}`,
        },
    ];
};

const notRequired = (rule:string) => {
    return [
        {
            required: false,
            message: `Please input your ${rule}`,
        },
    ];
};

export {  commonRules, notRequired };
