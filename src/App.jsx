import React, { useState } from 'react';
import CalendarView from './components/CalendarView';
import WeekView from './components/WeekView';
import { useHabits } from './hooks/useHabits';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState(null);
  
  const {
    habits,
    checkins,
    addHabit,
    removeHabit,
    toggleCheckin,
    getWeekHabits,
    getHabitCheckins
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
            onToggleCheckin={toggleCheckin}
            onRemoveHabit={removeHabit}
            getHabitCheckins={getHabitCheckins}
          />
        ) : (
          <CalendarView
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onWeekSelect={setSelectedWeek}
            habits={habits}
            checkins={checkins}
          />
        )}
      </div>
    </div>
  );
}

export default App;