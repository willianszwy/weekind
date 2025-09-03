export const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const dayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
export const dayNamesComplete = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

export const formatDate = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export const getWeekKey = (weekStart, weekEnd) => {
  return `${formatDate(weekStart)}_${formatDate(weekEnd)}`;
};

export const getWeeksInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const weeks = [];
  let currentDate = new Date(firstDay);
  
  // Ajustar para começar na segunda-feira
  while (currentDate.getDay() !== 1) {
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  while (currentDate <= lastDay || currentDate.getMonth() === month) {
    const weekStart = new Date(currentDate);
    const weekEnd = new Date(currentDate);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    weeks.push({
      start: new Date(weekStart),
      end: new Date(weekEnd),
      days: Array.from({ length: 7 }, (_, i) => {
        const day = new Date(weekStart);
        day.setDate(day.getDate() + i);
        return day;
      })
    });
    
    currentDate.setDate(currentDate.getDate() + 7);
    
    if (weeks.length > 6) break;
  }
  
  return weeks;
};

export const getWeekPerformance = (weekKey, habits, checkins) => {
  const weekHabits = habits[weekKey] || [];
  if (weekHabits.length === 0) return { type: 'love', performance: 1 };
  
  let totalPossibleCheckins = 0;
  let completedCheckins = 0;
  
  weekHabits.forEach(habit => {
    const habitKey = `${weekKey}_${habit.id}`;
    const habitCheckins = checkins[habitKey] || {};
    
    if (habit.type === 'daily') {
      totalPossibleCheckins += 7;
      completedCheckins += Object.values(habitCheckins).filter(Boolean).length;
    } else {
      totalPossibleCheckins += habit.customDays.length;
      habit.customDays.forEach(dayIndex => {
        if (habitCheckins[dayIndex]) completedCheckins++;
      });
    }
  });
  
  const performance = totalPossibleCheckins > 0 ? (completedCheckins / totalPossibleCheckins) : 0;
  return performance >= 0.5 
    ? { type: 'love', performance } 
    : { type: 'sad', performance };
};