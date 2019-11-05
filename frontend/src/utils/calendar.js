import moment from 'moment-timezone';

export const divideEvents = (events) => {
  let totalCounts = events.length;
  let organizedCounts = 0;
  let guestCounts = 0;
  let organized = [];
  let guest = [];
  let ratio  = 0;
  let res = {};

  res = events.map(event => {
    if (event.creator) {
      if (event.creator.self) organized.push(event);
      else guest.push(event);
      return event;
    }
    return null;
  });
  
  organizedCounts = organized.length;
  guestCounts = guest.length;
  totalCounts = organizedCounts + guestCounts;

  ratio = Math.round(guestCounts / organizedCounts * 10000) / 100;
  
  res = { totalCounts, organizedCounts, guestCounts, ratio, organized, guest };
  return res;
};

export const convertNumbers2StringWithK = (numbers) => {
  let res = Math.round(numbers / 1000);
  return res ? `${res}k` : `${numbers}`;
}

export const convertEvents2ChartDataByDate = (events, year, month) => {
  var res = [];
  for (var i = 0; i < 31; i++) res.push(0);
  if (events) {
    for(i = 0; i < events.length; i++) {
      let event = events[i];
      if (event.created) {
        let created_date = moment(event.created);
        var dt = moment(created_date);
        if (dt.year() === year && dt.month() === (month - 1))
          res[dt.day() - 1] ++;
      }
    }
  }
  return res;
}

export const convertEvents2ChartDataByWeek = (events, year) => {
  var res = [];
  for (var i = 0; i <= 50; i+=10) res.push(0);
  if (events) {
    for(i = 0; i < events.length; i++) {
      let event = events[i];
      if (event.created) {
        var created_date = moment(event.created);
        var dt = moment(created_date);
        if (dt.year() === year) res[Math.round(dt.week() / 10)] ++;
      }
    }
  }
  
  return res;
}

export const convertEvents2ChartDataByMonth = (events, year) => {
  var res = [];
  for (var i = 0; i < 11; i++) res.push(0);
  if (events)
    for(i = 0; i < events.length; i++) {
      let event = events[i];
      if (event.created) {
        var created_date = moment(event.created);
        var dt = moment(created_date);
        if (dt.year() === year) res[dt.month()] ++;
      }
    }
  return res;
}

export const convertEvents2ChartDataByHour = (events, year, month, day) => {
  var res = [];
  for (var i = 0; i < 24; i++) res.push(0);
  if (events)
    for(i = 0; i < events.length; i++) {
      let event = events[i];
      if (event.created) {
        var created_date = moment(event.created);
        var dt = moment(created_date);
        if (
          dt.year() === year &&
          dt.month() === (month - 1) &&
          dt.day() === day
        )
          res[dt.hour()] ++;
      }
    }
  return res;
}

export const getContactsFromEvents = (events) => {
  let contacts = [];
  if (events) {
    for (var i = 0; i < events.length; i++) {
      let event = events[i];
      if (event.attendees && event.attendees.length > 0) {
        for (var j = 0; j < event.attendees.length; j++) {
          let attendee = event.attendees[j];
          let find_contact = contacts.find(contact => (contact.email === attendee.email));
          if (find_contact) {
            // check status and update values
            if (attendee.responseStatus === 'needsAction')
              find_contact.needsAction ++;
            else if (attendee.responseStatus === 'declined')
              find_contact.declined ++;
            else if (attendee.responseStatus === 'tentative')
              find_contact.tentative ++;
            else if (attendee.responseStatus === 'accepted')
              find_contact.accepted ++;
            find_contact.total = find_contact.needsAction + find_contact.declined + find_contact.tentative + find_contact.accepted;
          } else {
            // add new contacts
            contacts.push({
              email: attendee.email,
              accepted: (attendee.responseStatus === 'accepted') ? 1 : 0,
              declined: (attendee.responseStatus === 'declined') ? 1 : 0,
              needsAction: (attendee.responseStatus === 'needsAction') ? 1 : 0,
              tentative: (attendee.responseStatus === 'tentative') ? 1 : 0,
              total: 1
            })
          }
        }
      }
    }
  }
  return contacts;
}