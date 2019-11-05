import React, { Component, lazy } from 'react';
import { Col, Row } from 'reactstrap';
import moment from 'moment-timezone';
import {
  divideEvents,
  convertNumbers2StringWithK,
  convertEvents2ChartDataByDate,
  convertEvents2ChartDataByWeek,
  convertEvents2ChartDataByMonth,
  convertEvents2ChartDataByHour,
  getContactsFromEvents
} from '../../utils/calendar';
// import sampleEvents from '../../constants/events';

const EventChartByDate = lazy(() => import('./EventChartByDate'));
const EventChartByWeek = lazy(() => import('./EventChartByWeek'));
const EventChartByMonth = lazy(() => import('./EventChartByMonth'));
const EventChartByHour = lazy(() => import('./EventChartByHour'));
const EventContactsTable = lazy(() => import('./EventContactsTable'));
const Widget02 = lazy(() => import('../../views/Widgets/Widget02'));

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      totalCounts: 0,
      organizedCounts: 0,
      guestCounts: 0,
      ratio: 0,
      orgnanized: [],
      guest: []
    };
  }

  componentWillMount() {
    const { getCalendarEvents } = this.props;
    if (getCalendarEvents) getCalendarEvents();
  }

  componentWillReceiveProps(nextProps) {
    const { calendarEvents } = nextProps;
    if (calendarEvents && calendarEvents.isFetched && calendarEvents.value) {
      this.setState({...divideEvents(nextProps.calendarEvents.value)});
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const { calendarEvents } = this.props;
    const { totalCounts, organizedCounts, guestCounts, ratio, organized, guest } = this.state;
    const selectedDate = moment();
    const year = selectedDate.year();
    const month = selectedDate.month(); // 7;
    const strMonth = selectedDate.format('MMMM');
    const day = selectedDate.month(); // 3;
    // By date
    const organizedCountsByDate = convertEvents2ChartDataByDate( organized/*sampleEvents*/, year, month);
    const guestCountsByDate = convertEvents2ChartDataByDate(guest, year, month);
    // By week
    const organizedCountsByWeek = convertEvents2ChartDataByWeek(organized, year);
    const guestCountsByWeek = convertEvents2ChartDataByWeek(guest, year);
    // By month
    const organizedCountsByMonth = convertEvents2ChartDataByMonth(organized, year);
    const guestCountsByMonth = convertEvents2ChartDataByMonth(guest, year);
    // By hour
    const organizedCountsByHour = convertEvents2ChartDataByHour(organized, year, month, day);
    const guestCountsByHour = convertEvents2ChartDataByHour(guest, year, month, day);
    // contacts
    const contacts = getContactsFromEvents(calendarEvents.value);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header={convertNumbers2StringWithK(totalCounts)} mainText="Total" icon="fa fa-cogs" color="primary" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header={convertNumbers2StringWithK(organizedCounts)} mainText="Organized" icon="fa fa-laptop" color="info" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header={convertNumbers2StringWithK(guestCounts)} mainText="Guest" icon="fa fa-moon-o" color="warning" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header={`${ratio}`} mainText="Ratio" icon="fa fa-bell" color="danger" />
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" lg="6">
            <EventChartByDate
              year={year}
              month={strMonth}
              organized={organizedCountsByDate}
              guest={guestCountsByDate}
            />
          </Col>
          <Col xs="12" sm="12" lg="6">
            <EventChartByWeek
              year={year}
              organized={organizedCountsByWeek}
              guest={guestCountsByWeek}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" lg="6">
            <EventChartByMonth
              year={year}
              organized={organizedCountsByMonth}
              guest={guestCountsByMonth}
            />
          </Col>
          <Col xs="12" sm="12" lg="6">
            <EventChartByHour
              year={year}
              month={strMonth}
              day={day}
              organized={organizedCountsByHour}
              guest={guestCountsByHour}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <EventContactsTable contacts={contacts} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Events;
