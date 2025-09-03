import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { monthNames, getWeekKey, dayNamesComplete } from '../utils/dateUtils';
import AddHabitForm from './AddHabitForm';
import RobotIcon from './RobotIcon';
import PlanetIcon from './PlanetIcon';

const WeekView = ({ week, onBack, habits, onAddHabit, onToggleCheckin, onRemoveHabit, getHabitCheckins }) => {
  const [showAddHabit, setShowAddHabit] = useState(false);
  const weekKey = getWeekKey(week.start, week.end);
  const weekHabits = habits[weekKey] || [];

  const handleAddHabit = (habitData) => {
    onAddHabit(weekKey, habitData);
    setShowAddHabit(false);
  };

  const handleRemoveHabit = (habitId) => {
    if (window.confirm('Tem certeza que deseja remover este hábito?')) {
      onRemoveHabit(weekKey, habitId);
    }
  };

  return (
    <div className="calm-glass">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="calm-button-secondary flex items-center gap-2"
            style={{ fontFamily: 'Asimovian, sans-serif' }}
          >
            <ArrowLeft size={20} />
            Voltar ao calendário
          </button>
          
          <div className="text-center flex-1 mx-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <RobotIcon size={50} className="drop-shadow-sm" />
              <h2 className="text-2xl font-medium calm-text-primary" style={{ fontFamily: 'Asimovian, sans-serif' }}>
                {monthNames[week.start.getMonth()]}: 
                <span style={{ fontFamily: 'Dosis, sans-serif' }}> {week.start.getDate()} a {week.end.getDate()}</span>
              </h2>
            </div>
            <p className="text-sm calm-text-secondary font-medium" style={{ fontFamily: 'Dosis, sans-serif' }}>
              Do or not do. There's no try.
            </p>
          </div>

          <button
            onClick={() => setShowAddHabit(true)}
            className="calm-button-primary flex items-center gap-2"
            style={{ fontFamily: 'Asimovian, sans-serif' }}
          >
            <Plus size={20} />
            Novo Hábito
          </button>
        </div>

        {showAddHabit && (
          <div className="mb-8">
            <AddHabitForm
              onAddHabit={handleAddHabit}
              onCancel={() => setShowAddHabit(false)}
            />
          </div>
        )}

        {weekHabits.length > 0 ? (
          <div className="space-y-4">
            {weekHabits.map(habit => {
              const habitCheckins = getHabitCheckins(weekKey, habit.id);
              const completedDays = Object.values(habitCheckins).filter(Boolean).length;
              const totalDays = habit.type === 'daily' ? 7 : habit.customDays.length;
              const progressPercent = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;
              
              return (
                <div key={habit.id} className="bg-white/40 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium calm-text-primary mb-1">{habit.name}</h3>
                      <div className="flex items-center gap-2 text-sm calm-text-secondary">
                        <span style={{ fontFamily: 'Dosis, sans-serif' }}>{completedDays}/{totalDays} dias concluídos</span>
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-teal-400 to-blue-400 transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                        <span className="font-medium" style={{ fontFamily: 'Dosis, sans-serif' }}>{Math.round(progressPercent)}%</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveHabit(habit.id)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-50"
                      title="Remover hábito"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-3">
                    {week.days.map((day, dayIndex) => {
                      const isActive = habit.type === 'daily' || habit.customDays.includes(dayIndex);
                      const isChecked = habitCheckins[dayIndex];
                      const dayName = dayNamesComplete[dayIndex];
                      
                      return (
                        <div key={dayIndex} className="text-center">
                          <div className="text-xs calm-text-muted mb-2 font-medium" style={{ fontFamily: 'Asimovian, sans-serif' }}>
                            {dayName.slice(0, 3)}
                          </div>
                          <div className="text-sm calm-text-secondary mb-3 font-light" style={{ fontFamily: 'Dosis, sans-serif' }}>
                            {day.getDate()}/{day.getMonth() + 1}
                          </div>
                          {isActive ? (
                            <button
                              onClick={() => onToggleCheckin(weekKey, habit.id, dayIndex)}
                              className={`mx-auto transition-all duration-300 ${
                                isChecked 
                                  ? 'habit-cell-active hover:scale-110' 
                                  : 'habit-cell-inactive hover:scale-105'
                              }`}
                              title={`${isChecked ? 'Concluído' : 'Não concluído'} - ${dayName}, ${day.getDate()}/${day.getMonth() + 1}`}
                            />
                          ) : (
                            <div 
                              className="habit-cell-disabled mx-auto opacity-50" 
                              title="Dia não ativo para este hábito"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <PlanetIcon size={64} className="mb-6 opacity-50 mx-auto" />
            <h3 className="text-xl font-medium calm-text-primary mb-3" style={{ fontFamily: 'Dosis, sans-serif' }}>
              Nenhum hábito cadastrado ainda
            </h3>
            <p className="calm-text-secondary font-light mb-6 max-w-md mx-auto" style={{ fontFamily: 'Dosis, sans-serif' }}>
              "Your focus determines your reality." - Qui-Gon Jinn
            </p>
            <button
              onClick={() => setShowAddHabit(true)}
              className="calm-button-primary flex items-center gap-2 mx-auto"
              style={{ fontFamily: 'Asimovian, sans-serif' }}
            >
              <Plus size={20} />
              Criar Primeiro Hábito
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeekView;