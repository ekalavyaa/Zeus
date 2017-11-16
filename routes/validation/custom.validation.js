module.exports = {
	customValidators: {
    isOrder: (value) => {
    return value === 1 || value === -1;
    },
    isBoolean: (value) => {
    return (typeof value === 'boolean');
    },
    validRole: (value) => {
    return ((value === 'UNIV_ADMIN')||(value === 'COURSE_ADMIN')||(value === 'STUDENT_ADMIN')||(value === 'FEE_ADMIN'));
    },
    isArray: (value) => {
    return Array.isArray(value);
    },
    eachIsEmpty: (values, prop) => {
    return values.every((val) => {
    return val[prop] && val[prop] !== '';
    });
    },
    validInteger: function(value) {
    return (parseInt(value, 10));
    },
    isRange: (value,min,max) => {
    return parseInt(value,10) >= min && parseInt(value,10) <= max;
    },		
    isMultiple: (value,multiple) => {
    return (parseInt(value, 10) % multiple === 0);
    },
    isValidPollContent: (value) => {
        var textContentSplits = value.replace( /\n/g, " " ).split( " " );
        var link;
        var linkFound = false;
        for(var i = 0; i < textContentSplits.length; i ++) {
            if(textContentSplits[i].startsWith('http') && !linkFound) {
                link = textContentSplits[i];
                linkFound = true;
            } else if(textContentSplits[i].startsWith('http') && linkFound) {
                // More than one link present
                return false;
            }
        }

        // Text should be 140 char max
        if(!linkFound && value.length > 140 || !linkFound && value.length < 1) {
            return false;
        }
        // If the link present and length of non link text > 140
        if(linkFound) {
            var pollWithoutLink = value.replace(link, '');
            if(pollWithoutLink.length > 140 || pollWithoutLink.length < 1) {
                return false;
            }
        }

        return true;
    }
	}
};
