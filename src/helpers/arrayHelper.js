function getNewAppointementsOnly(freeDates, knownAppointments) {
    let res = [];
    for (const freeDatesItem of freeDates) {
        let isFound = false;
        for (const knownAppointmentsItem of knownAppointments) {
            if (freeDatesItem.date === knownAppointmentsItem.date &&
                freeDatesItem.time === knownAppointmentsItem.time) {
                isFound = true;
                break;
            }
        }

        !isFound && res.push(freeDatesItem);
    }

    return res;
}

exports.getNewAppointementsOnly = getNewAppointementsOnly;