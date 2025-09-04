import { useState, useEffect } from 'react';

export const useHabits = () => {
  const [habits, setHabits] = useState({});
  const [checkins, setCheckins] = useState({});

  useEffect(() => {
    const savedHabits = localStorage.getItem('weekind-habits');
    const savedCheckins = localStorage.getItem('weekind-checkins');
    
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
    
    if (savedCheckins) {
      setCheckins(JSON.parse(savedCheckins));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('weekind-habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('weekind-checkins', JSON.stringify(checkins));
  }, [checkins]);

  const addHabit = (weekKey, habit) => {
    const habitWithId = {
      ...habit,
      id: Date.now().toString(),
    };
    
    setHabits(prev => ({
      ...prev,
      [weekKey]: [...(prev[weekKey] || []), habitWithId]
    }));
    
    return habitWithId.id;
  };

  const removeHabit = (weekKey, habitId) => {
    setHabits(prev => ({
      ...prev,
      [weekKey]: prev[weekKey]?.filter(h => h.id !== habitId) || []
    }));
    
    // Remove related check-ins
    const checkinKey = `${weekKey}_${habitId}`;
    setCheckins(prev => {
      const newCheckins = { ...prev };
      delete newCheckins[checkinKey];
      return newCheckins;
    });
  };

  const editHabit = (weekKey, habitId, updatedHabit) => {
    setHabits(prev => ({
      ...prev,
      [weekKey]: prev[weekKey]?.map(habit => 
        habit.id === habitId ? { ...habit, ...updatedHabit } : habit
      ) || []
    }));
  };

  const toggleCheckin = (weekKey, habitId, dayIndex) => {
    const checkinKey = `${weekKey}_${habitId}`;
    setCheckins(prev => ({
      ...prev,
      [checkinKey]: {
        ...prev[checkinKey],
        [dayIndex]: !prev[checkinKey]?.[dayIndex]
      }
    }));
  };

  const getWeekHabits = (weekKey) => habits[weekKey] || [];
  
  const getHabitCheckins = (weekKey, habitId) => {
    const checkinKey = `${weekKey}_${habitId}`;
    return checkins[checkinKey] || {};
  };

  return {
    habits,
    checkins,
    addHabit,
    removeHabit,
    editHabit,
    toggleCheckin,
    getWeekHabits,
    getHabitCheckins
  };
};