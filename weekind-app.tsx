import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

const Weekind = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [habits, setHabits] = useState({});
  const [checkins, setCheckins] = useState({});
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: '', type: 'daily', customDays: [] });

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const dayNamesComplete = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  // Função para obter as semanas do mês
  const getWeeksInMonth = (date) => {
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
      
      if (weeks.length > 6) break; // Evitar loop infinito
    }
    
    return weeks;
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getWeekKey = (weekStart, weekEnd) => {
    return `${formatDate(weekStart)}_${formatDate(weekEnd)}`;
  };

  const getWeekPerformance = (weekKey) => {
    const weekHabits = habits[weekKey] || [];
    if (weekHabits.length === 0) return '⭐';
    
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
    return performance >= 0.5 ? '⭐' : '😢';
  };

  const addHabit = () => {
    if (!newHabit.name.trim() || !selectedWeek) return;
    
    const weekKey = getWeekKey(selectedWeek.start, selectedWeek.end);
    const habitId = Date.now().toString();
    const habit = {
      id: habitId,
      name: newHabit.name.trim(),
      type: newHabit.type,
      customDays: newHabit.customDays
    };
    
    setHabits(prev => ({
      ...prev,
      [weekKey]: [...(prev[weekKey] || []), habit]
    }));
    
    setNewHabit({ name: '', type: 'daily', customDays: [] });
    setShowAddHabit(false);
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

  const toggleCustomDay = (dayIndex) => {
    setNewHabit(prev => ({
      ...prev,
      customDays: prev.customDays.includes(dayIndex)
        ? prev.customDays.filter(d => d !== dayIndex)
        : [...prev.customDays, dayIndex]
    }));
  };

  const weeks = getWeeksInMonth(currentDate);

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.07)',
    backdropFilter: 'blur(20px) saturate(139%)',
    WebkitBackdropFilter: 'blur(20px) saturate(139%)',
    border: '0px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
  };

  if (selectedWeek) {
    const weekKey = getWeekKey(selectedWeek.start, selectedWeek.end);
    const weekHabits = habits[weekKey] || [];
    
    return (
      <div 
        className="min-h-screen p-4"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-6" style={glassStyle}>
            <div className="p-6">
              <button
                onClick={() => setSelectedWeek(null)}
                className="mb-4 px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2"
              >
                <ChevronLeft size={20} />
                Voltar ao calendário
              </button>
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {monthNames[selectedWeek.start.getMonth()]}: {selectedWeek.start.getDate()} a {selectedWeek.end.getDate()}
                </h2>
                <button
                  onClick={() => setShowAddHabit(true)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  Novo Hábito
                </button>
              </div>

              {showAddHabit && (
                <div className="mb-6 p-4 bg-white/10 rounded-lg">
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Nome do hábito"
                      value={newHabit.name}
                      onChange={(e) => setNewHabit(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-white mb-2">Periodicidade:</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-white">
                        <input
                          type="radio"
                          value="daily"
                          checked={newHabit.type === 'daily'}
                          onChange={(e) => setNewHabit(prev => ({ ...prev, type: e.target.value, customDays: [] }))}
                        />
                        Diário
                      </label>
                      <label className="flex items-center gap-2 text-white">
                        <input
                          type="radio"
                          value="custom"
                          checked={newHabit.type === 'custom'}
                          onChange={(e) => setNewHabit(prev => ({ ...prev, type: e.target.value }))}
                        />
                        Personalizado
                      </label>
                    </div>
                  </div>

                  {newHabit.type === 'custom' && (
                    <div className="mb-4">
                      <label className="block text-white mb-2">Dias da semana:</label>
                      <div className="grid grid-cols-7 gap-2">
                        {dayNamesComplete.map((day, index) => (
                          <button
                            key={index}
                            onClick={() => toggleCustomDay(index)}
                            className={`p-2 rounded text-sm transition-colors ${
                              newHabit.customDays.includes(index)
                                ? 'bg-green-500 text-white'
                                : 'bg-white/20 text-white'
                            }`}
                          >
                            {dayNames[index]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={addHabit}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      Adicionar
                    </button>
                    <button
                      onClick={() => {
                        setShowAddHabit(false);
                        setNewHabit({ name: '', type: 'daily', customDays: [] });
                      }}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {weekHabits.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-3 text-white font-semibold">Hábito</th>
                        {selectedWeek.days.map((day, index) => (
                          <th key={index} className="text-center p-3 text-white font-semibold min-w-12">
                            {day.getDate()}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {weekHabits.map(habit => {
                        const checkinKey = `${weekKey}_${habit.id}`;
                        const habitCheckins = checkins[checkinKey] || {};
                        
                        return (
                          <tr key={habit.id} className="border-t border-white/20">
                            <td className="p-3 text-white">{habit.name}</td>
                            {selectedWeek.days.map((day, dayIndex) => {
                              const isActive = habit.type === 'daily' || habit.customDays.includes(dayIndex);
                              const isChecked = habitCheckins[dayIndex];
                              
                              return (
                                <td key={dayIndex} className="p-3 text-center">
                                  {isActive ? (
                                    <button
                                      onClick={() => toggleCheckin(weekKey, habit.id, dayIndex)}
                                      className={`w-6 h-6 rounded transition-colors ${
                                        isChecked 
                                          ? 'bg-green-500' 
                                          : 'bg-red-500 hover:bg-red-400'
                                      }`}
                                    />
                                  ) : (
                                    <div className="w-6 h-6 bg-gray-400 rounded mx-auto" />
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center text-white/70 py-8">
                  Nenhum hábito cadastrado para esta semana.
                  <br />
                  Clique em "Novo Hábito" para começar!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen p-4"
      style={{
        fontFamily: 'Montserrat, sans-serif',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6" style={glassStyle}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setCurrentDate(newDate);
                }}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              
              <h1 className="text-3xl font-bold text-white">
                Weekind
              </h1>
              
              <button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setCurrentDate(newDate);
                }}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>

            <div className="grid grid-cols-8 gap-2 mb-4">
              <div className="p-3 text-center text-white font-semibold">Semana</div>
              {dayNames.map(day => (
                <div key={day} className="p-3 text-center text-white font-semibold">
                  {day}
                </div>
              ))}
            </div>

            {weeks.map((week, weekIndex) => {
              const weekKey = getWeekKey(week.start, week.end);
              const performance = getWeekPerformance(weekKey);
              
              return (
                <div
                  key={weekIndex}
                  onClick={() => setSelectedWeek(week)}
                  className="grid grid-cols-8 gap-2 mb-2 cursor-pointer hover:bg-white/10 rounded-lg transition-colors p-2"
                >
                  <div className="p-3 text-center text-2xl">
                    {performance}
                  </div>
                  {week.days.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`p-3 text-center text-white rounded ${
                        day.getMonth() === currentDate.getMonth()
                          ? 'bg-white/20'
                          : 'bg-white/5 text-white/50'
                      }`}
                    >
                      {day.getDate()}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weekind;