import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Edit } from 'lucide-react';
import { monthNames, getWeekKey, dayNamesComplete } from '../utils/dateUtils';
import AddHabitForm from './AddHabitForm';
import RobotIcon from './RobotIcon';
import PlanetIcon from './PlanetIcon';

const WeekView = ({ week, onBack, habits, onAddHabit, onToggleCheckin, onRemoveHabit, onEditHabit, getHabitCheckins, onImportFromPreviousWeek }) => {
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
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

  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
    setShowAddHabit(false);
  };

  const handleUpdateHabit = (habitData) => {
    onEditHabit(weekKey, editingHabit.id, habitData);
    setEditingHabit(null);
  };

  const handleImportFromPreviousWeek = () => {
    const success = onImportFromPreviousWeek(weekKey);
    if (success) {
      alert('Hábitos da semana anterior importados com sucesso!');
    } else {
      alert('Não há hábitos na semana anterior para importar.');
    }
  };

  return (
    <div className="calm-glass">
      <div className="p-8">
        {/* Layout responsivo com botões em cima */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <button
            onClick={onBack}
            className="calm-button-secondary flex items-center gap-2 w-full sm:w-auto"
            style={{ fontFamily: 'Asimovian, sans-serif' }}
          >
            <ArrowLeft size={20} />
            Voltar ao calendário
          </button>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={handleImportFromPreviousWeek}
              className="calm-button-secondary flex items-center gap-2 justify-center w-full sm:w-auto"
              style={{ fontFamily: 'Asimovian, sans-serif' }}
              title="Importar hábitos da semana anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 17L12 13L16 17M12 13V21M20 6.5C20 4.01 17.99 2 15.5 2C13.46 2 11.77 3.3 11.22 5.1C10.87 5.04 10.44 5 10 5C7.79 5 6 6.79 6 9C6 9.68 6.16 10.32 6.44 10.9C4.46 11.92 3 13.74 3 15.84C3 18.59 5.23 20.82 8 20.82H20C21.66 20.82 23 19.48 23 17.82C23 16.16 21.66 14.82 20 14.82H18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Hábitos Antigos
            </button>
            <button
              onClick={() => setShowAddHabit(true)}
              className="calm-button-primary flex items-center gap-2 justify-center w-full sm:w-auto"
              style={{ fontFamily: 'Asimovian, sans-serif' }}
            >
              <Plus size={20} />
              Novo Hábito
            </button>
          </div>
        </div>

        {/* Título e citação centralizados */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <RobotIcon size={50} className="drop-shadow-sm" />
            <h2 className="text-3xl font-medium calm-text-primary" style={{ fontFamily: 'Asimovian, sans-serif' }}>
              {monthNames[week.start.getMonth()]}: 
              <span style={{ fontFamily: 'Dosis, sans-serif' }}> {week.start.getDate()} a {week.end.getDate()}</span>
            </h2>
          </div>
          <p className="text-sm calm-text-secondary font-medium italic" style={{ fontFamily: 'Dosis, sans-serif' }}>
            "Do or not do. There's no try."
          </p>
        </div>

        {showAddHabit && (
          <div className="mb-8">
            <AddHabitForm
              onAddHabit={handleAddHabit}
              onCancel={() => setShowAddHabit(false)}
            />
          </div>
        )}

        {editingHabit && (
          <div className="mb-8">
            <AddHabitForm
              initialHabit={editingHabit}
              onAddHabit={handleUpdateHabit}
              onCancel={() => setEditingHabit(null)}
              isEditing={true}
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
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditHabit(habit)}
                        className="p-2 text-slate-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50"
                        title="Editar hábito"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleRemoveHabit(habit.id)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-50"
                        title="Remover hábito"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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