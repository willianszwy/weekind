import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MyWeekCard = ({ habits, checkins }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dayLetters = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']; // Domingo, Segunda, Terça, Quarta, Quinta, Sexta, Sábado

  const priorityColors = {
    'alta': 'text-red-600',
    'media': 'text-orange-600',
    'baixa': 'text-green-600',
    'baixissima': 'text-blue-600'
  };

  const getWeekKeyForDate = (date) => {
    // Encontrar início da semana (domingo)
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day; // Domingo = 0, então não precisa ajuste
    startOfWeek.setDate(diff);
    
    // Encontrar fim da semana (sábado)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const formatDate = (date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    
    return {
      key: `${formatDate(startOfWeek)}_${formatDate(endOfWeek)}`,
      start: startOfWeek,
      end: endOfWeek
    };
  };

  const getWeekHabits = () => {
    const weekInfo = getWeekKeyForDate(selectedDate);
    return habits[weekInfo.key] || [];
  };

  const formatWeekRange = (startDate, endDate) => {
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    const startDay = String(startDate.getDate()).padStart(2, '0');
    const endDay = String(endDate.getDate()).padStart(2, '0');
    const month = monthNames[startDate.getMonth()];
    
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${startDay} a ${endDay} de ${month}`;
    } else {
      const startMonth = monthNames[startDate.getMonth()];
      const endMonth = monthNames[endDate.getMonth()];
      return `${startDay} de ${startMonth} a ${endDay} de ${endMonth}`;
    }
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setSelectedDate(newDate);
  };

  const getHabitStatus = (habit, dayIndex) => {
    // Verificar se o hábito está programado para este dia
    if (habit.type === 'daily') {
      // Hábito diário - sempre está programado
    } else if (habit.type === 'custom') {
      // Hábito personalizado - verificar se este dia está selecionado
      if (!habit.customDays.includes(dayIndex)) {
        return 'not-scheduled'; // Célula vazia
      }
    }

    // Verificar se foi concluído
    const weekInfo = getWeekKeyForDate(selectedDate);
    const checkinKey = `${weekInfo.key}_${habit.id}`;
    const habitCheckins = checkins[checkinKey] || {};
    
    return habitCheckins[dayIndex] ? 'completed' : 'pending';
  };

  const renderCell = (status, index = Math.random()) => {
    switch (status) {
      case 'completed':
        const uniqueId1 = `gradient1-${index}`;
        const uniqueId2 = `gradient2-${index}`;
        const uniqueId3 = `gradient3-${index}`;
        return (
          <svg 
            viewBox="0 0 128 128" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-5 h-5 mx-auto"
            aria-hidden="true" 
            role="img"
          >
            <defs>
              <radialGradient id={uniqueId1} cx="64.344" cy="9.403" r="83.056" gradientUnits="userSpaceOnUse">
                <stop offset=".508" stopColor="#32c335"></stop>
                <stop offset=".684" stopColor="#24a864"></stop>
                <stop offset=".878" stopColor="#2ca324"></stop>
                <stop offset=".981" stopColor="#277e26"></stop>
              </radialGradient>
              <radialGradient id={uniqueId2} cx="63.118" cy="24.114" r="65.281" gradientUnits="userSpaceOnUse">
                <stop offset=".508" stopColor="#32c335"></stop>
                <stop offset=".684" stopColor="#24a864"></stop>
                <stop offset=".878" stopColor="#2ca324"></stop>
                <stop offset=".981" stopColor="#277e26"></stop>
              </radialGradient>
              <radialGradient id={uniqueId3} cx="62.811" cy="13.081" r="75.09" gradientUnits="userSpaceOnUse">
                <stop offset=".508" stopColor="#32c335"></stop>
                <stop offset=".684" stopColor="#24a864"></stop>
                <stop offset=".878" stopColor="#2ca324"></stop>
                <stop offset=".981" stopColor="#277e26"></stop>
              </radialGradient>
            </defs>
            <path fill="#277e26" d="M30.47 104.24h13.39v13.39H30.47z"></path>
            <path fill="#277e26" d="M84.04 104.24h13.39v13.39H84.04z"></path>
            <path fill="#32c335" d="M30.48 10.51h13.39V23.9H30.48z"></path>
            <path fill="#32c335" d="M84.04 10.51h13.39V23.9H84.04z"></path>
            <path d="M97.46 64.08V37.3H84.04V23.9H70.65v13.4H57.26V23.9H43.87v13.4H30.48v26.78H17.09v13.39h13.39v13.4h13.39v13.38h13.39V90.87h13.39v13.38h13.39V90.87h13.42v-13.4h13.37V64.08H97.46zm-40.21 0H43.86V50.69h13.39v13.39zm26.78 0H70.64V50.69h13.39v13.39z" fill={`url(#${uniqueId1})`}></path>
            <path fill={`url(#${uniqueId2})`} d="M110.82 37.29h13.4v26.8h-13.4z"></path>
            <path fill={`url(#${uniqueId3})`} d="M3.7 37.28h13.4v26.8H3.7z"></path>
          </svg>
        );
      case 'pending':
        const pendingUniqueId1 = `pending-gradient1-${index}`;
        const pendingUniqueId2 = `pending-gradient2-${index}`;
        const pendingUniqueId3 = `pending-gradient3-${index}`;
        return (
          <svg 
            viewBox="0 0 128 128" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-5 h-5 mx-auto"
            aria-hidden="true" 
            role="img"
          >
            <defs>
              <radialGradient id={pendingUniqueId1} cx="64.344" cy="9.403" r="83.056" gradientUnits="userSpaceOnUse">
                <stop offset=".508" stopColor="#bd4200"></stop>
                <stop offset=".684" stopColor="#bd4200"></stop>
                <stop offset=".878" stopColor="#bd4200"></stop>
                <stop offset=".981" stopColor="#bd4200"></stop>
              </radialGradient>
              <radialGradient id={pendingUniqueId2} cx="63.118" cy="24.114" r="65.281" gradientUnits="userSpaceOnUse">
                <stop offset=".508" stopColor="#bd4200"></stop>
                <stop offset=".684" stopColor="#bd4200"></stop>
                <stop offset=".878" stopColor="#bd4200"></stop>
                <stop offset=".981" stopColor="#bd4200"></stop>
              </radialGradient>
              <radialGradient id={pendingUniqueId3} cx="62.811" cy="13.081" r="75.09" gradientUnits="userSpaceOnUse">
                <stop offset=".508" stopColor="#bd4200"></stop>
                <stop offset=".684" stopColor="#bd4200"></stop>
                <stop offset=".878" stopColor="#bd4200"></stop>
                <stop offset=".981" stopColor="#bd4200"></stop>
              </radialGradient>
            </defs>
            <path fill="#bd4200" d="M30.47 104.24h13.39v13.39H30.47z"></path>
            <path fill="#bd4200" d="M84.04 104.24h13.39v13.39H84.04z"></path>
            <path fill="#bd4200" d="M30.48 10.51h13.39V23.9H30.48z"></path>
            <path fill="#bd4200" d="M84.04 10.51h13.39V23.9H84.04z"></path>
            <path d="M97.46 64.08V37.3H84.04V23.9H70.65v13.4H57.26V23.9H43.87v13.4H30.48v26.78H17.09v13.39h13.39v13.4h13.39v13.38h13.39V90.87h13.39v13.38h13.39V90.87h13.42v-13.4h13.37V64.08H97.46zm-40.21 0H43.86V50.69h13.39v13.39zm26.78 0H70.64V50.69h13.39v13.39z" fill={`url(#${pendingUniqueId1})`}></path>
            <path fill={`url(#${pendingUniqueId2})`} d="M110.82 37.29h13.4v26.8h-13.4z"></path>
            <path fill={`url(#${pendingUniqueId3})`} d="M3.7 37.28h13.4v26.8H3.7z"></path>
          </svg>
        );
      case 'not-scheduled':
      default:
        return <span className="text-transparent">-</span>; // Célula vazia
    }
  };

  const weekInfo = getWeekKeyForDate(selectedDate);
  const weekHabits = getWeekHabits();

  return (
    <div className="calm-glass">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigateWeek(-1)}
            className="calm-button-secondary flex items-center gap-2"
            aria-label="Semana anterior"
            style={{ fontFamily: 'Asimovian, sans-serif' }}
          >
            <ChevronLeft size={20} />
            Anterior
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-medium calm-text-primary" style={{ fontFamily: 'Asimovian, sans-serif' }}>
              Minha Semana
            </h2>
            <div className="text-sm calm-text-secondary mt-1" style={{ fontFamily: 'Dosis, sans-serif' }}>
              {formatWeekRange(weekInfo.start, weekInfo.end)}
            </div>
          </div>
          
          <button
            onClick={() => navigateWeek(1)}
            className="calm-button-secondary flex items-center gap-2"
            aria-label="Próxima semana"
            style={{ fontFamily: 'Asimovian, sans-serif' }}
          >
            Próxima
            <ChevronRight size={20} />
          </button>
        </div>
        
        {weekHabits.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-4 calm-text-primary font-semibold" style={{ fontFamily: 'Asimovian, sans-serif' }}>
                    Hábito
                  </th>
                  {dayLetters.map((day, index) => (
                    <th key={index} className="text-center p-4 calm-text-primary font-semibold min-w-12" style={{ fontFamily: 'Asimovian, sans-serif' }}>
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weekHabits.map(habit => (
                  <tr key={habit.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <span 
                        className={`font-medium ${priorityColors[habit.priority || 'baixa']}`}
                        style={{ fontFamily: 'Dosis, sans-serif' }}
                      >
                        {habit.name}
                      </span>
                    </td>
                    {dayLetters.map((_, dayIndex) => {
                      const status = getHabitStatus(habit, dayIndex);
                      return (
                        <td key={dayIndex} className="p-4 text-center">
                          {renderCell(status, `${habit.id}-${dayIndex}`)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="calm-text-muted" style={{ fontFamily: 'Dosis, sans-serif' }}>
              Nenhum hábito cadastrado para esta semana.
              <br />
              Adicione hábitos no calendário mensal para vê-los aqui!
            </p>
          </div>
        )}
        
        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <p className="text-sm calm-text-muted italic" style={{ fontFamily: 'Dosis, sans-serif' }}>
            "People assume that time is a strict progression of cause to effect, but actually from a nonlinear, non-subjective viewpoint, it's more like a big ball of wibbly-wobbly, timey-wimey... stuff." — The Tenth Doctor
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyWeekCard;