'use strict'

var React  = require('react')
var moment = require('moment')

var FORMAT   = require('./utils/format')
var asConfig = require('./utils/asConfig')
var toMoment = require('./toMoment')
var onEnter  = require('./onEnter')
var assign   = require('object-assign')

var TODAY

function emptyFn(){}

class YearView extends React.Component {
    static displayName = 'YearView';
    static defaultProps = asConfig();

    /**
     * Returns all the days in the specified month.
     *
     * @param  {Moment/Date/Number} value
     * @return {Moment[]}
     */
    getMonthsInYear = (value) => {
        var start = moment(value).startOf('year')
        var result = []
        var i = 0

        for (; i < 12; i++){
            result.push(moment(start))
            start.add(1, 'month')
        }

        return result
    };

    render() {

        TODAY = +moment().startOf('day')

        var props = assign({}, this.props)

        var viewMoment = props.viewMoment = moment(this.props.viewDate)

        if (props.date){
            props.moment = moment(props.date).startOf('month')
        }

        var monthsInView = this.getMonthsInYear(viewMoment)

        return (
            <div className="dp-table dp-year-view">
                {this.renderMonths(props, monthsInView)}
            </div>
        )
    }

    /**
     * Render the given array of days
     * @param  {Moment[]} days
     * @return {React.DOM}
     */
    renderMonths = (props, days) => {
        var nodes      = days.map(function(date){
            return this.renderMonth(props, date)
        }, this)
        var len        = days.length
        var buckets    = []
        var bucketsLen = Math.ceil(len / 4)

        var i = 0

        for ( ; i < bucketsLen; i++){
            buckets.push(nodes.slice(i * 4, (i + 1) * 4))
        }

        return buckets.map(function(bucket, i){
            return <div key={"row" + i} className="dp-row">{bucket}</div>
        })
    };

    renderMonth = (props, date) => {
        var monthText = FORMAT.month(date, props.monthFormat)
        var classes = ["dp-cell dp-month"]

        var dateTimestamp = +date

        if (dateTimestamp == props.moment){
            classes.push('dp-value')
        }

        var onClick = this.handleClick.bind(this, props, date)

        return (
            <div
                tabIndex="1"
                role="link"
                key={monthText}
                className={classes.join(' ')}
                onClick={onClick}
                onKeyUp={onEnter(onClick)}
            >
                {monthText}
            </div>
        )
    };

    handleClick = (props, date, event) => {
        event.target.value = date

        ;(props.onSelect || emptyFn)(date, event)
    };
}

YearView.getHeaderText = function(moment, props) {
    return toMoment(moment, null, { locale: props.locale }).format('YYYY')
}

module.exports = YearView
