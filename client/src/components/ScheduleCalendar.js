import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const ScheduleCalendar = ({ events }) => {
  // Prep events for calendar
  const calendarEvents = events.map(event => ({
    title: `${event.subject} (${event.room})`,
    start: new Date(`${event.date}T${event.startTime}`),
    end: new Date(`${event.date}T${event.endTime}`),
    allDay: false,
  }));

  return (
    <div className="h-[500px] glass p-4 rounded-2xl border border-white/5">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%', color: '#fff' }}
        eventPropGetter={() => ({
          style: {
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            borderLeft: '4px solid #6366f1',
            color: '#fff',
            fontSize: '11px',
            borderRadius: '4px',
            padding: '2px 8px'
          }
        })}
      />
    </div>
  );
};

export default ScheduleCalendar;
