export function convertNullToEmptyString(obj) {
    Object.entries(obj).forEach(([key, value]) => {
        if (value === 'null') {
            obj[key] = '';
        }
    });

    return obj;
}

export function deleteIfEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === '') {
            delete obj[key];
        }
    }
    return obj;
}

export function delete_Id_Of_Product(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key) ) {
            delete obj['pt_id'];
        }
    }
    return obj;
}