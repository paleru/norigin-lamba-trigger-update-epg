const request = require('request')

const schedule = (day, channelId, callback) => {
    const url = 'https://sumo.tv2.no/rest/live_channels/epg?day=' + day

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect to program guide', undefined)
        } else if (response.body.error) {
            callback('Unable to find any schedule for the given date', undefined)
        } else {
            const timeZoneOffset = new Date().getTimezoneOffset() * 60000 // offset variable 
            const epgItems = response.body.epgs[channelId].epg_items
            const schedules = epgItems.map((item) => ({
                title: item.title,
                // use the offset variable to convert UTC to UTC +2
                startTime: new Date(new Date(item.air_time).getTime() - timeZoneOffset),
                endTime: new Date(new Date(item.end_time).getTime() - timeZoneOffset),
                channelId: item.channel_id
            }))
            console.log(schedules)
            callback(undefined, schedules)
        }
    })
}

module.exports = schedule;