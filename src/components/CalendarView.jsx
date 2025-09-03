import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { monthNames, dayNames, getWeeksInMonth, getWeekKey, getWeekPerformance } from '../utils/dateUtils';
import LoveIcon from './LoveIcon';
import SadIcon from './SadIcon';
import MapIcon from './MapIcon';

const CalendarView = ({ currentDate, onDateChange, onWeekSelect, habits, checkins }) => {
  const weeks = getWeeksInMonth(currentDate);

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    onDateChange(newDate);
  };

  return (
    <div className="calm-glass">
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center justify-center mb-4">
            <MapIcon size={100} className="drop-shadow-sm mb-3" />
            <h1 className="text-4xl font-normal calm-text-primary" style={{ fontFamily: 'Asimovian, sans-serif' }}>
              Weekind
            </h1>
          </div>
          <p className="text-sm calm-text-secondary font-medium" style={{ fontFamily: 'Dosis, sans-serif' }}>
            Make your habits, make your world
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigateMonth(-1)}
            className="calm-button-secondary flex items-center gap-2"
            aria-label="Mês anterior"
            style={{ fontFamily: 'Asimovian, sans-serif' }}
          >
            <ChevronLeft size={20} />
            Anterior
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-medium calm-text-primary" style={{ fontFamily: 'Asimovian, sans-serif' }}>
              {monthNames[currentDate.getMonth()]}
            </h2>
            <div className="text-lg font-medium calm-text-secondary" style={{ fontFamily: 'Dosis, sans-serif' }}>
              {currentDate.getFullYear()}
            </div>
          </div>
          
          <button
            onClick={() => navigateMonth(1)}
            className="calm-button-secondary flex items-center gap-2"
            aria-label="Próximo mês"
            style={{ fontFamily: 'Asimovian, sans-serif' }}
          >
            Próximo
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-8 gap-3 mb-6">
          <div className="p-4 text-center calm-text-secondary font-medium text-sm" style={{ fontFamily: 'Asimovian, sans-serif' }}>
            Semana
          </div>
          {dayNames.map(day => (
            <div key={day} className="p-4 text-center calm-text-secondary font-medium text-sm" style={{ fontFamily: 'Asimovian, sans-serif' }}>
              {day}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {weeks.map((week, weekIndex) => {
            const weekKey = getWeekKey(week.start, week.end);
            const performanceData = getWeekPerformance(weekKey, habits, checkins);
            
            return (
              <div
                key={weekIndex}
                onClick={() => onWeekSelect(week)}
                className="grid grid-cols-8 gap-3 cursor-pointer hover:bg-blue-50/50 rounded-2xl transition-all duration-300 p-3 group"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onWeekSelect(week)}
              >
                <div 
                  className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300" 
                  title={`Performance da semana: ${Math.round(performanceData.performance * 100)}%`}
                >
                  {performanceData.type === 'love' ? (
                    <LoveIcon size={32} className="drop-shadow-sm" />
                  ) : (
                    <SadIcon size={32} className="drop-shadow-sm" />
                  )}
                </div>
                {week.days.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`p-4 text-center rounded-xl transition-all duration-300 ${
                      day.getMonth() === currentDate.getMonth()
                        ? 'bg-white/60 calm-text-primary font-medium group-hover:bg-white/80 group-hover:shadow-sm'
                        : 'bg-white/30 calm-text-muted font-light'
                    }`}
                    style={{ fontFamily: 'Dosis, sans-serif' }}
                  >
                    {day.getDate()}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs calm-text-muted font-light" style={{ fontFamily: 'Asimovian, sans-serif' }}>
            Clique em uma semana para gerenciar seus hábitos
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;