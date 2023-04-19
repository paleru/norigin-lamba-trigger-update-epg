const request = require('request')

const schedule = (day, channelId, callback) => {
    const url = 'https://sumo.tv2.no/rest/live_channels/epg?day=' + day

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect to program guide', undefined)
        } else if (response.body.error) {
            callback('Unable to find any schedule for the given date', undefined)
        } else {
            const epgItems = response.body.epgs[channelId].epg_items
            const schedules = epgItems.map((item) => ({
                title: item.title,
                startTime: item.air_time,
                endTime: item.end_time,
                channelId: item.channel_id
            }))
            callback(undefined, schedules)
        }
    })
}

module.exports = schedule;