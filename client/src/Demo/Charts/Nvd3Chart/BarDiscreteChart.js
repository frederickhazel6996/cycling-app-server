import React, { useState } from 'react';
import NVD3Chart from 'react-nvd3';
import RPT from 'react-proptypes';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
let d3 = require('d3');
const BarDiscreteChart = ({ loading, usage, year }) => {
    let counter = 0;
    let january = 0;
    let february = 0;
    let march = 0;
    let april = 0;
    let may = 0;
    let june = 0;
    let july = 0;
    let august = 0;
    let september = 0;
    let october = 0;
    let november = 0;
    let december = 0;

    while (counter < usage.length) {
        if (
            usage[counter].month.toLowerCase() === 'january' &&
            usage[counter].Year === year
        ) {
            january = january + usage[counter].usage_count;
        }
        if (
            usage[counter].month.toLowerCase() === 'february' &&
            usage[counter].Year === year
        ) {
            february = february + usage[counter].usage_count;
        }
        if (
            usage[counter].month.toLowerCase() === 'march' &&
            usage[counter].Year === year
        ) {
            march = march + usage[counter].usage_count;
        }
        if (
            usage[counter].month.toLowerCase() === 'april' &&
            usage[counter].Year === year
        ) {
            april = april + usage[counter].usage_count;
        }
        if (
            usage[counter].month.toLowerCase() === 'may' &&
            usage[counter].Year === year
        ) {
            may = may + usage[counter].usage_count;
        }
        if (
            usage[counter].month.toLowerCase() === 'june' &&
            usage[counter].Year === year
        ) {
            june = june + usage[counter].usage_count;
        }
        if (
            usage[counter].month.toLowerCase() === 'july' &&
            usage[counter].Year === year
        ) {
            july = july + usage[counter].usage_count;
        }
        if (
            usage[counter].month.toLowerCase() === 'august' &&
            usage[counter].Year === year
        ) {
            august = august + usage[counter].usage_count;
        }
        if (
            usage[counter].month.toLowerCase() === 'september' &&
            usage[counter].Year === year
        ) {
            september = september + usage[counter].usage_count;
        }
        if (
            usage[counter].month.toLowerCase() === 'october' &&
            usage[counter].Year === year
        ) {
            october = october + usage[counter].usage_count;
        }
        if (
            usage[counter].month.toLowerCase() === 'november' &&
            usage[counter].Year === year
        ) {
            november = november + usage[counter].usage_count;
        }
        if (
            usage[counter].month.toLowerCase() === 'december' &&
            usage[counter].Year === year
        ) {
            december = december + usage[counter].usage_count;
        }
        counter++;
    }
    const datum = [
        {
            key: 'Cumulative Return',
            values: [
                {
                    label: 'Jan',
                    value: january,
                    color: '#3ebfea'
                },
                {
                    label: 'Feb',
                    value: february,
                    color: '#df0'
                },
                {
                    label: 'Mar',
                    value: march,
                    color: '##FD3A4A'
                },
                {
                    label: 'Apr',
                    value: april,
                    color: '#1de9b6'
                },
                {
                    label: 'May',
                    value: may,
                    color: '#4C5667'
                },
                {
                    label: 'Jun',
                    value: june,
                    color: '#69CEC6'
                },
                {
                    label: 'Jul',
                    value: july,
                    color: '#a389d4'
                },
                {
                    label: 'Aug',
                    value: august,
                    color: '#df0'
                },
                {
                    label: 'Sep',
                    value: september,
                    color: '#33CC99'
                },
                {
                    label: 'Oct',
                    value: october,
                    color: '#66FF66'
                },
                {
                    label: 'Nov',
                    value: november,
                    color: '#3F26BF'
                },
                {
                    label: 'Dec',
                    value: december,
                    color: '#df0000'
                }
            ]
        }
    ];

    function getX(d) {
        return d.label;
    }
    function getY(d) {
        return d.value;
    }

    return (
        <NVD3Chart
            tooltip={{ enabled: true }}
            type="discreteBarChart"
            datum={datum}
            x={getX}
            y={getY}
            height={300}
            yAxis={{
                axisLabel: 'Number of People (P)',
                tickFormat: d3.format('d')
            }}
            xAxis={{
                axisLabel: 'Months (M)'
            }}
        />
    );
};

const mapStateToProps = state => {
    return {
        loading: state.admin.loading,
        usage: state.admin.allDays,
        year: state.admin.year
    };
};

const mapDispatchtoProps = dispatch => {
    return {};
};

BarDiscreteChart.propTypes = {
    loading: RPT.bool,
    usage: RPT.array,
    year: RPT.string
};

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(withRouter(BarDiscreteChart));
