import React, { useState, useEffect } from 'react';
import CalendarView from './components/CalendarView';
import WeekView from './components/WeekView';
import DailyStatusCard from './components/DailyStatusCard';
import MyDayCard from './components/MyDayCard';
import WeeklyStatusCard from './components/WeeklyStatusCard';
import MyWeekCard from './components/MyWeekCard';
import MapIcon from './components/MapIcon';
import { useHabits } from './hooks/useHabits';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState(null);
  
  const {
    habits,
    checkins,
    addHabit,
    removeHabit,
    editHabit,
    toggleCheckin,
    getWeekHabits,
    getHabitCheckins,
    importHabitsFromPreviousWeek
  } = useHabits();

  const handleBackToCalendar = () => {
    setSelectedWeek(null);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {selectedWeek ? (
          <WeekView
            week={selectedWeek}
            onBack={handleBackToCalendar}
            habits={habits}
            onAddHabit={addHabit}
            onEditHabit={editHabit}
            onToggleCheckin={toggleCheckin}
            onRemoveHabit={removeHabit}
            getHabitCheckins={getHabitCheckins}
            onImportFromPreviousWeek={importHabitsFromPreviousWeek}
          />
        ) : (
          <div className="space-y-6">
            {/* Header separado */}
            <div className="text-center">
              <div className="flex flex-col items-center justify-center mb-4">
                <MapIcon size={100} className="drop-shadow-sm mb-3" />
                <h1 className="text-4xl font-normal calm-text-primary" style={{ fontFamily: 'Asimovian, sans-serif' }}>
                  Weekind
                </h1>
              </div>
              <p className="text-base calm-text-secondary font-medium italic" style={{ fontFamily: 'Dosis, sans-serif' }}>
                "The laws of time are mine, and they will obey me!" – The Tenth Doctor
              </p>
            </div>

            {/* Card Status do Dia */}
            <DailyStatusCard 
              habits={habits}
              checkins={checkins}
            />

            {/* Card Meu Dia */}
            <MyDayCard 
              habits={habits}
              checkins={checkins}
              toggleCheckin={toggleCheckin}
            />

            {/* Card Status da Semana */}
            <WeeklyStatusCard 
              habits={habits}
              checkins={checkins}
            />

            {/* Card Minha Semana */}
            <MyWeekCard 
              habits={habits}
              checkins={checkins}
            />

            {/* Card do Calendário */}
            <CalendarView
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              onWeekSelect={setSelectedWeek}
              habits={habits}
              checkins={checkins}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;