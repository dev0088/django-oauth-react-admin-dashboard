import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

var months = [];
for (var i = 1; i <= 12; i++) {
  months.push(i);
}

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: true,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
        stacked: true
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
        },
        stacked: true
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class EventChartByMonth extends Component {
  render() {
    const { year, organized, guest } = this.props;
    
    const mainChart = {
      labels: months,
      datasets: [
        {
          label: 'is_guest',
          borderColor: '#20a8d8',
          backgroundColor: '#20a8d8',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 1,
          data: guest,
        },
        {
          label: 'is_organizer',
          borderColor: '#ffc107',
          backgroundColor: '#ffc107',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 1,
          data: organized,
        }
      ],
    };

    return (
      <Card>
        <CardBody>
          <Row>
            <Col sm="5">
              <CardTitle className="mb-0">Events By Month</CardTitle>
              <div className="small text-muted">{`${year}`}</div>
            </Col>
            <Col sm="7" className="d-none d-sm-inline-block"></Col>
          </Row>
          <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
            <Bar data={mainChart} options={mainChartOpts} height={300} />
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default EventChartByMonth;
