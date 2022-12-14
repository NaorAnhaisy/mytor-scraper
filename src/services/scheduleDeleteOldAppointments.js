const schedule = require('node-schedule');
const appointmentsService = require('./appointmentsService');
const { getDaysDiff } = require('../helpers/dateHelper');
const DAYS_PASSED_TO_DELETE_APPOINTMENT = 2;

// For testing:
// const DAYS_PASSED_TO_DELETE_APPOINTMENT = -62;

// Schedule delete old appointment every midnight (0 0 * * *)
// For testing: */10 * * * * *
schedule.scheduleJob('0 0 * * *', async function () {
    console.log('Start schedule delete old appointments:');

    try {
        let toBeDeletedAppointmentsIDs = [];
        let allAppointments = await appointmentsService.getAll();
        allAppointments.forEach(appointment => {
            if (getDaysDiff(new Date(), appointment.date) > DAYS_PASSED_TO_DELETE_APPOINTMENT) {
                toBeDeletedAppointmentsIDs.push(appointment._id);
            }
        });

        if (toBeDeletedAppointmentsIDs && toBeDeletedAppointmentsIDs.length) {
            await appointmentsService.deleteArrayOfAppointments(toBeDeletedAppointmentsIDs);
            console.log(`Successfully deleteded all ${toBeDeletedAppointmentsIDs.length} old appointments.`);
        } else {
            console.log("Not found any old enough appointments to delete.");
        }

    } catch (error) {
        console.error("Delete old appointments schedule failed: ", error, error.message);
    } finally {
        console.log('End deleting old appointments schedule.');
    }
});