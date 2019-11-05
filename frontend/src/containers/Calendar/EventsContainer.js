import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Events from '../../views/Calendar/Events';
import * as CalendarEventsActions from '../../actions/calendar_events';

function mapStateToProps(state) {
  const { calendarEvents } = state;
  return {
    calendarEvents
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CalendarEventsActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
