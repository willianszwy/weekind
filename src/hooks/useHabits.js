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

  // Função para calcular chave de semana a partir de qualquer data
  const getWeekKeyFromDate = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day; // Domingo = 0
    startOfWeek.setDate(diff);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const formatDate = (date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    
    return `${formatDate(startOfWeek)}_${formatDate(endOfWeek)}`;
  };

  const importHabitsFromPreviousWeek = (currentWeekKey) => {
    // Pegar qualquer data da semana atual - corrigindo problema de timezone
    const [startStr] = currentWeekKey.split('_');
    const [year, month, day] = startStr.split('-').map(Number);
    const currentDate = new Date(year, month - 1, day); // Usar construtor local
    
    // Voltar 7 dias e calcular a chave da semana anterior corretamente
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 7);
    
    const previousWeekKey = getWeekKeyFromDate(previousDate);
    const previousHabits = habits[previousWeekKey] || [];
    
    if (previousHabits.length === 0) {
      return false; // Não há hábitos para importar
    }
    
    // Importar hábitos com novos IDs
    const importedHabits = previousHabits.map(habit => ({
      ...habit,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 11)
    }));
    
    setHabits(prev => ({
      ...prev,
      [currentWeekKey]: [...(prev[currentWeekKey] || []), ...importedHabits]
    }));
    
    return true; // Sucesso na importação
  };

  return {
    habits,
    checkins,
    addHabit,
    removeHabit,
    editHabit,
    toggleCheckin,
    getWeekHabits,
    getHabitCheckins,
    importHabitsFromPreviousWeek
  };
};