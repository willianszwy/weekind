import React, { useState } from 'react';
import { Plus, X, Sparkles } from 'lucide-react';
import { dayNames, dayNamesComplete } from '../utils/dateUtils';

const AddHabitForm = ({ onAddHabit, onCancel }) => {
  const [habit, setHabit] = useState({ name: '', type: 'daily', customDays: [] });

  const handleSubmit = () => {
    if (!habit.name.trim()) return;
    if (habit.type === 'custom' && habit.customDays.length === 0) return;
    onAddHabit(habit);
    setHabit({ name: '', type: 'daily', customDays: [] });
  };

  const toggleCustomDay = (dayIndex) => {
    setHabit(prev => ({
      ...prev,
      customDays: prev.customDays.includes(dayIndex)
        ? prev.customDays.filter(d => d !== dayIndex)
        : [...prev.customDays, dayIndex]
    }));
  };

  const isFormValid = habit.name.trim() && (habit.type === 'daily' || habit.customDays.length > 0);

  return (
    <div className="bg-white/50 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={24} className="text-blue-500" />
        <h3 className="text-xl font-medium calm-text-primary" style={{ fontFamily: 'Dosis, sans-serif' }}>Criar Novo Hábito</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium calm-text-secondary mb-2" style={{ fontFamily: 'Dosis, sans-serif' }}>
            Nome do hábito
          </label>
          <input
            type="text"
            placeholder="Ex: Meditar 10 minutos, Ler um capítulo, Exercitar-se..."
            style={{ fontFamily: 'Dosis, sans-serif' }}
            value={habit.name}
            onChange={(e) => setHabit(prev => ({ ...prev, name: e.target.value }))}
            className="calm-input w-full"
            maxLength={50}
          />
          <div className="text-xs calm-text-muted mt-1" style={{ fontFamily: 'Dosis, sans-serif' }}>
            {habit.name.length}/50 caracteres
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium calm-text-secondary mb-3" style={{ fontFamily: 'Dosis, sans-serif' }}>
            Frequência
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="calm-button-secondary cursor-pointer transition-all duration-200 hover:scale-[0.98] flex items-center justify-center gap-2 text-center">
              <input
                type="radio"
                value="daily"
                checked={habit.type === 'daily'}
                onChange={(e) => setHabit(prev => ({ ...prev, type: e.target.value, customDays: [] }))}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                habit.type === 'daily' 
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-slate-300'
              }`}>
                {habit.type === 'daily' && (
                  <div className="w-full h-full rounded-full bg-white scale-50" />
                )}
              </div>
              <span className="font-medium" style={{ fontFamily: 'Dosis, sans-serif' }}>Todos os dias</span>
            </label>
            <label className="calm-button-secondary cursor-pointer transition-all duration-200 hover:scale-[0.98] flex items-center justify-center gap-2 text-center">
              <input
                type="radio"
                value="custom"
                checked={habit.type === 'custom'}
                onChange={(e) => setHabit(prev => ({ ...prev, type: e.target.value }))}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                habit.type === 'custom' 
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-slate-300'
              }`}>
                {habit.type === 'custom' && (
                  <div className="w-full h-full rounded-full bg-white scale-50" />
                )}
              </div>
              <span className="font-medium" style={{ fontFamily: 'Dosis, sans-serif' }}>Dias específicos</span>
            </label>
          </div>
        </div>

        {habit.type === 'custom' && (
          <div>
            <label className="block text-sm font-medium calm-text-secondary mb-3" style={{ fontFamily: 'Dosis, sans-serif' }}>
              Selecione os dias da semana
            </label>
            <div className="grid grid-cols-7 gap-2">
              {dayNamesComplete.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleCustomDay(index)}
                  className={`p-3 rounded-xl text-xs font-medium transition-all duration-200 ${
                    habit.customDays.includes(index)
                      ? 'bg-gradient-to-r from-teal-400 to-blue-400 text-white shadow-lg scale-105'
                      : 'calm-button-secondary hover:scale-105'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold">{dayNames[index]}</div>
                    <div className="text-xs opacity-75">{day.slice(0, 3)}</div>
                  </div>
                </button>
              ))}
            </div>
            {habit.customDays.length > 0 && (
              <div className="text-sm calm-text-secondary mt-2" style={{ fontFamily: 'Dosis, sans-serif' }}>
                {habit.customDays.length} {habit.customDays.length === 1 ? 'dia selecionado' : 'dias selecionados'}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`flex-1 flex items-center justify-center gap-2 transition-all duration-200 ${
              isFormValid 
                ? 'calm-button-primary' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Plus size={20} />
            <span style={{ fontFamily: 'Dosis, sans-serif' }}>Criar Hábito</span>
          </button>
          <button
            onClick={onCancel}
            className="calm-button-secondary flex items-center gap-2"
          >
            <X size={20} />
            <span style={{ fontFamily: 'Dosis, sans-serif' }}>Cancelar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHabitForm;