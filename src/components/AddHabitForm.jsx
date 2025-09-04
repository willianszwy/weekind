import React, { useState } from 'react';
import { Plus, X, Sparkles } from 'lucide-react';
import { dayNames, dayNamesComplete } from '../utils/dateUtils';

const AddHabitForm = ({ onAddHabit, onCancel, initialHabit = null, isEditing = false }) => {
  const [habit, setHabit] = useState(
    initialHabit || { name: '', type: 'daily', customDays: [], period: 0, priority: 'baixa' }
  );

  const handleSubmit = () => {
    if (!habit.name.trim()) return;
    if (habit.type === 'custom' && habit.customDays.length === 0) return;
    onAddHabit(habit);
    setHabit({ name: '', type: 'daily', customDays: [], period: 0, priority: 'baixa' });
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
        <h3 className="text-xl font-medium calm-text-primary" style={{ fontFamily: 'Dosis, sans-serif' }}>
          {isEditing ? 'Editar Hábito' : 'Criar Novo Hábito'}
        </h3>
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

        <div>
          <label className="block text-sm font-medium calm-text-secondary mb-3" style={{ fontFamily: 'Dosis, sans-serif' }}>
            Período do dia
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Manhã', 'Tarde', 'Noite'].map((period, index) => (
              <label key={index} className="calm-button-secondary cursor-pointer transition-all duration-200 hover:scale-[0.98] flex items-center justify-center gap-2">
                <input
                  type="radio"
                  value={index}
                  checked={habit.period === index}
                  onChange={(e) => setHabit(prev => ({ ...prev, period: parseInt(e.target.value) }))}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                  habit.period === index 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-slate-300'
                }`}>
                  {habit.period === index && (
                    <div className="w-full h-full rounded-full bg-white scale-50" />
                  )}
                </div>
                <span className="font-medium text-sm flex items-center gap-2" style={{ fontFamily: 'Dosis, sans-serif' }}>
                  {period === 'Manhã' && 
                    <svg height="32" width="32" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path style={{fill:'#E18C36'}} d="M245.324,14.069l-57.829,100.164h137.011L266.677,14.069C261.931,5.851,250.07,5.851,245.324,14.069z "></path>
                        <path style={{fill:'#EC8560'}} d="M77.381,92.479l29.934,111.718l96.882-96.882L92.479,77.381 C83.313,74.925,74.925,83.312,77.381,92.479z"></path>
                        <path style={{fill:'#E18C36'}} d="M14.07,266.675l100.164,57.829v-137.01L14.07,245.324C5.852,250.069,5.852,261.931,14.07,266.675z"></path>
                        <path style={{fill:'#EC8560'}} d="M92.479,434.619l111.718-29.934l-96.882-96.882L77.381,419.521 C74.925,428.688,83.313,437.075,92.479,434.619z"></path>
                        <path style={{fill:'#E18C36'}} d="M266.676,497.93l57.829-100.164h-137.01l57.829,100.164 C250.07,506.149,261.931,506.149,266.676,497.93z"></path>
                        <path style={{fill:'#EC8560'}} d="M434.62,419.521l-29.934-111.718l-96.882,96.882l111.718,29.934 C428.688,437.075,437.076,428.688,434.62,419.521z"></path>
                        <path style={{fill:'#E18C36'}} d="M497.93,245.324l-100.164-57.829v137.011l100.164-57.829 C506.149,261.931,506.149,250.069,497.93,245.324z"></path>
                        <path style={{fill:'#EC8560'}} d="M419.522,77.381l-111.718,29.934l96.882,96.882L434.62,92.479 C437.076,83.312,428.688,74.925,419.522,77.381z"></path>
                        <path style={{opacity:0.1}} d="M101.653,183.064l5.663,21.133l89.722-89.722 C157.395,124.873,123.613,149.727,101.653,183.064z"></path>
                        <path style={{opacity:0.1}} d="M91.618,200.552c-10.836,21.904-16.935,46.569-16.935,72.661 c0,10.264,0.952,20.305,2.754,30.047l36.798,21.245V187.494L91.618,200.552z"></path>
                        <path style={{opacity:0.1}} d="M107.316,307.803l-12.059,45.005 c14.907,26.824,37.112,49.028,63.936,63.936l45.005-12.059L107.316,307.803z"></path>
                        <path style={{opacity:0.1}} d="M187.495,397.766l21.245,36.798c9.742,1.803,19.783,2.754,30.047,2.754 c26.093,0,50.757-6.1,72.661-16.935l13.057-22.616H187.495V397.766z"></path>
                        <path style={{opacity:0.1}} d="M307.804,404.685l21.132,5.663c33.337-21.959,58.192-55.741,68.589-95.384 L307.804,404.685z"></path>
                        <circle style={{fill:'#F7D64C'}} cx="256" cy="255.999" r="164.103"></circle>
                        <path style={{opacity:0.3,fill:'#FFFFFF'}} d="M287.522,94.933c-4.992,9.877-7.821,21.034-7.821,32.856 c0,40.297,32.668,72.964,72.964,72.964c19.118,0,36.511-7.362,49.521-19.394C379.61,137.233,337.639,104.684,287.522,94.933z"></path>
                        <path d="M501.883,238.477l-85.043-49.1l25.417-94.853c1.893-7.066-0.064-14.372-5.237-19.543c-5.171-5.172-12.48-7.131-19.543-5.237 l-94.853,25.415l-49.1-85.043C269.866,3.782,263.314,0,256,0s-13.865,3.782-17.522,10.117l-49.1,85.043L94.525,69.744 c-7.066-1.892-14.372,0.064-19.544,5.237c-5.172,5.172-7.13,12.478-5.237,19.543l25.417,94.853l-85.043,49.1 c-6.335,3.658-10.117,10.208-10.117,17.522c0,7.314,3.782,13.865,10.117,17.522l85.043,49.1l-25.417,94.853 c-1.893,7.066,0.065,14.372,5.237,19.543c3.874,3.874,8.944,5.945,14.215,5.945c1.766,0,3.555-0.233,5.328-0.707l94.853-25.417 l49.1,85.043C242.135,508.218,248.686,512,256,512c7.314,0,13.865-3.782,17.522-10.117l49.1-85.043l94.853,25.417 c1.774,0.475,3.562,0.707,5.328,0.707c5.271,0,10.342-2.07,14.215-5.945c5.172-5.172,7.13-12.478,5.237-19.543l-25.417-94.853 l85.043-49.1c6.335-3.658,10.117-10.208,10.117-17.522C511.999,248.685,508.218,242.135,501.883,238.477z M90.094,301.439 l-72.07-41.61c-1.995-1.152-2.212-3.062-2.212-3.83c0-0.767,0.216-2.677,2.212-3.83l72.07-41.61 c-3.971,14.481-6.103,29.715-6.103,45.439C83.99,271.723,86.123,286.957,90.094,301.439z M252.172,18.023 c1.152-1.995,3.062-2.212,3.83-2.212c0.767,0,2.677,0.216,3.83,2.212l41.61,72.07c-14.481-3.971-29.715-6.103-45.439-6.103 s-30.958,2.132-45.439,6.103L252.172,18.023z M85.017,90.433c-0.597-2.226,0.601-3.729,1.144-4.271 c0.543-0.543,2.045-1.742,4.271-1.144l80.444,21.555c-26.745,15.295-49.011,37.561-64.304,64.304L85.017,90.433z M90.433,426.982 c-2.226,0.598-3.728-0.602-4.271-1.144c-0.543-0.543-1.74-2.045-1.144-4.271l21.555-80.444 c15.295,26.745,37.561,49.011,64.304,64.305L90.433,426.982z M259.83,493.977c-1.152,1.995-3.062,2.212-3.83,2.212 c-0.767,0-2.677-0.216-3.83-2.212l-41.61-72.07c14.481,3.971,29.715,6.103,45.439,6.103s30.958-2.132,45.439-6.103L259.83,493.977z M256,412.199c-86.128,0-156.199-70.07-156.199-156.199S169.872,99.801,256,99.801s156.199,70.07,156.199,156.199 S342.129,412.199,256,412.199z M426.983,421.567c0.597,2.226-0.601,3.729-1.144,4.271c-0.543,0.543-2.046,1.742-4.271,1.144 l-80.444-21.555c26.745-15.295,49.01-37.561,64.304-64.305L426.983,421.567z M405.429,170.877 c-15.295-26.745-37.561-49.011-64.304-64.304l80.444-21.555c2.225-0.598,3.728,0.602,4.271,1.144 c0.543,0.543,1.74,2.045,1.144,4.271L405.429,170.877z M493.977,259.829l-72.07,41.61c3.971-14.481,6.103-29.715,6.103-45.439 c0-15.724-2.132-30.958-6.103-45.439l72.07,41.61c1.995,1.152,2.211,3.062,2.211,3.83 C496.189,256.767,495.973,258.677,493.977,259.829z M297.103,261.905c-4.366,0-7.906,3.54-7.906,7.906 c0,6.973-5.672,12.646-12.645,12.646c-6.973,0-12.646-5.673-12.646-12.646c0-4.366-3.54-7.906-7.906-7.906 c-4.366,0-7.906,3.54-7.906,7.906c0,6.973-5.673,12.646-12.646,12.646c-6.973,0-12.645-5.673-12.645-12.646 c0-4.366-3.54-7.906-7.906-7.906s-7.906,3.54-7.906,7.906c0,15.691,12.765,28.458,28.457,28.458c8.071,0,15.368-3.377,20.552-8.792 c5.184,5.416,12.481,8.792,20.552,8.792c15.691,0,28.457-12.766,28.457-28.458C305.008,265.444,301.469,261.905,297.103,261.905z M350.924,222.468c-4.366,0-7.906,3.54-7.906,7.906v8.729c0,4.366,3.54,7.906,7.906,7.906s7.906-3.54,7.906-7.906v-8.729 C358.83,226.008,355.29,222.468,350.924,222.468z M161.077,222.468c-4.366,0-7.906,3.54-7.906,7.906v8.729 c0,4.366,3.54,7.906,7.906,7.906s7.906-3.54,7.906-7.906v-8.729C168.983,226.008,165.443,222.468,161.077,222.468z"></path>
                      </g>
                    </svg>
                  } 
                  {period === 'Tarde' && 
                    <svg height="32" width="32" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path style={{fill:'#D5EBEF'}} d="M454.173,228.816c0.537-3.534,0.817-7.152,0.817-10.835c0-39.522-32.039-71.561-71.561-71.561 c-8.331,0-16.322,1.438-23.758,4.055c-21.586-37.552-62.102-62.841-108.525-62.841c-55.641,0-102.788,36.333-119.034,86.564 C63.53,174.788,8.115,230.556,8.115,299.275c0,69.085,56.004,125.09,125.09,125.09h264.862c58.443,0,105.82-47.377,105.82-105.82 C503.885,280.713,484.029,247.524,454.173,228.816z"></path>
                        <path style={{opacity:0.1}} d="M422.16,400.27H157.298c-69.085,0-125.09-56.005-125.09-125.09 c0-18.492,1.867-38.222,5.928-57.198c-18.715,21.862-30.021,50.255-30.021,81.293c0,69.085,56.004,125.09,125.09,125.09h264.862 c35.371,0,66.684-17.358,85.899-44.016C466.576,392.882,445.232,400.27,422.16,400.27z"></path>
                        <path d="M298.189,301.013c-4.482,0-8.115,3.633-8.115,8.115c0,7.157-5.822,12.98-12.979,12.98s-12.98-5.823-12.98-12.98 c0-4.482-3.633-8.115-8.115-8.115c-4.482,0-8.115,3.633-8.115,8.115c0,7.157-5.823,12.98-12.98,12.98s-12.979-5.823-12.979-12.98 c0-4.482-3.633-8.115-8.115-8.115c-4.482,0-8.115,3.633-8.115,8.115c0,16.106,13.103,29.21,29.209,29.21 c8.285,0,15.774-3.467,21.095-9.025c5.321,5.559,12.811,9.025,21.095,9.025c16.106,0,29.209-13.104,29.209-29.21 C306.303,304.645,302.67,301.013,298.189,301.013z M158.567,258.572c-11.515,0-20.884,9.369-20.884,20.883 c0,4.482,3.633,8.115,8.115,8.115c4.482,0,8.115-3.633,8.115-8.115c0-2.566,2.088-4.654,4.655-4.654 c2.566,0,4.655,2.088,4.655,4.654c0,4.482,3.633,8.115,8.115,8.115c4.482,0,8.115-3.633,8.115-8.115 C179.45,267.941,170.082,258.572,158.567,258.572z M462.816,224.791c0.193-2.265,0.289-4.542,0.289-6.809 c0-43.933-35.743-79.676-79.676-79.676c-6.813,0-13.548,0.863-20.099,2.572c-24.398-38.006-66.8-61.357-112.184-61.357 c-56.055,0-105.525,34.618-124.866,86.736c-33.168,1.691-64.107,15.488-87.645,39.216C13.72,230.585,0,263.898,0,299.275 c0,73.45,59.755,133.205,133.203,133.205h264.862C460.889,432.48,512,381.368,512,318.545 C512,280.786,493.71,246.116,462.816,224.791z M398.065,416.25H133.203c-64.499,0-116.974-52.474-116.974-116.975 c0-31.066,12.049-60.32,33.926-82.371c21.864-22.04,50.994-34.323,82.025-34.589c3.494-0.029,6.576-2.293,7.652-5.617 c15.659-48.417,60.392-80.946,111.313-80.946c41.763,0,80.651,22.519,101.49,58.77c1.95,3.391,6.042,4.909,9.73,3.611 c6.777-2.386,13.864-3.595,21.063-3.595c34.985,0,63.447,28.462,63.447,63.447c0,3.213-0.243,6.45-0.724,9.618 c-0.485,3.197,0.974,6.377,3.714,8.093c28.745,18.012,45.906,48.985,45.906,82.852C495.77,372.419,451.94,416.25,398.065,416.25z M353.433,258.572c-11.515,0-20.884,9.369-20.884,20.883c0,4.482,3.633,8.115,8.115,8.115c4.482,0,8.115-3.633,8.115-8.115 c0-2.566,2.088-4.654,4.655-4.654c2.566,0,4.655,2.088,4.655,4.654c0,4.482,3.633,8.115,8.115,8.115 c4.482,0,8.115-3.633,8.115-8.115C374.317,267.941,364.948,258.572,353.433,258.572z"></path>
                      </g>
                    </svg>
                  } 
                  {period === 'Noite' && 
                    <svg height="32" width="32" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <circle style={{fill:'#5F666F'}} cx="256" cy="256.001" r="248.033"></circle>
                        <circle style={{fill:'#DBE7F2'}} cx="256" cy="199.357" r="25.85"></circle>
                        <path style={{opacity:0.08}} d="M184.825,18.351C123.119,36.806,71.507,78.625,40.264,133.55 c12.671,5.427,26.624,8.437,41.281,8.437c57.956,0,104.94-46.984,104.94-104.94C186.487,30.666,185.916,24.418,184.825,18.351z"></path>
                        <circle style={{opacity:0.08}} cx="355.391" cy="361.044" r="54.412"></circle>
                        <circle style={{opacity:0.08}} cx="161.495" cy="341.773" r="97.692"></circle>
                        <path style={{opacity:0.08}} d="M279.924,480.109c-136.984,0-248.033-111.047-248.033-248.033 c0-62.404,23.053-119.419,61.098-163.011C40.89,114.534,7.967,181.42,7.967,256.001c0,136.984,111.048,248.033,248.033,248.033 c74.581,0,141.466-32.923,186.934-85.021C399.342,457.057,342.327,480.109,279.924,480.109z"></path>
                        <path d="M166.038,156.048h-11.399c-4.4,0-7.967,3.567-7.967,7.967c0,4.4,3.567,7.967,7.967,7.967h11.399 c4.4,0,7.967-3.567,7.967-7.967C174.005,159.615,170.438,156.048,166.038,156.048z M256.003,165.544 c-18.647,0-33.818,15.17-33.818,33.817s15.17,33.817,33.818,33.817c18.647,0,33.817-15.17,33.817-33.817 S274.65,165.544,256.003,165.544z M256.003,217.244c-9.861,0-17.883-8.022-17.883-17.882c0-9.861,8.022-17.882,17.883-17.882 c9.861,0,17.882,8.022,17.882,17.882C273.885,209.222,265.864,217.244,256.003,217.244z M437.019,74.981 C388.667,26.63,324.38,0.001,256,0.001S123.333,26.63,74.981,74.981C26.628,123.333,0,187.621,0,256.001 s26.628,132.667,74.981,181.019c48.352,48.352,112.639,74.98,181.019,74.98s132.667-26.628,181.019-74.98S512,324.38,512,256.001 S485.372,123.333,437.019,74.981z M425.752,425.752C380.409,471.095,320.123,496.066,256,496.066s-124.409-24.971-169.752-70.313 C40.906,380.41,15.935,320.125,15.935,256.001S40.906,131.591,86.248,86.249S191.877,15.935,256,15.935 s124.409,24.971,169.752,70.313s70.313,105.628,70.313,169.752S471.094,380.41,425.752,425.752z M357.366,156.048h-11.398 c-4.4,0-7.967,3.567-7.967,7.967c0,4.4,3.567,7.967,7.967,7.967h11.398c4.4,0,7.967-3.567,7.967-7.967 C365.334,159.615,361.767,156.048,357.366,156.048z"></path>
                      </g>
                    </svg>
                  } {period}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium calm-text-secondary mb-3" style={{ fontFamily: 'Dosis, sans-serif' }}>
            Prioridade
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { 
                key: 'alta', 
                label: 'Alta', 
                icon: (
                  <svg height="32" width="32" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path style={{fill:'#cc4928'}} d="M469.344,266.664v-85.328h-42.656v-42.672H384v-21.328h42.688v-64h-64v42.656H320v42.672H192V95.992 h-42.656V53.336h-64v64H128v21.328H85.344v42.672H42.688v85.328H0v149.328h64v-85.328h21.344v85.328H128v42.672h106.688v-64h-85.344 v-21.328h213.344v21.328h-85.344v64H384v-42.672h42.688v-85.328H448v85.328h64V266.664H469.344z M192,245.336h-64v-64h64V245.336z M384,245.336h-64v-64h64V245.336z"></path>
                    </g>
                  </svg>
                )
              },
              { 
                key: 'media', 
                label: 'Média', 
                icon: (
                  <svg height="32" width="32" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path style={{fill:'#f4c26c'}} d="M469.344,266.664v-85.328h-42.656v-42.672H384v-21.328h42.688v-64h-64v42.656H320v42.672H192V95.992 h-42.656V53.336h-64v64H128v21.328H85.344v42.672H42.688v85.328H0v149.328h64v-85.328h21.344v85.328H128v42.672h106.688v-64h-85.344 v-21.328h213.344v21.328h-85.344v64H384v-42.672h42.688v-85.328H448v85.328h64V266.664H469.344z M192,245.336h-64v-64h64V245.336z M384,245.336h-64v-64h64V245.336z"></path>
                    </g>
                  </svg>
                )
              },
              { 
                key: 'baixa', 
                label: 'Baixa', 
                icon: (
                  <svg height="32" width="32" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path style={{fill:'#30ba26'}} d="M469.344,266.664v-85.328h-42.656v-42.672H384v-21.328h42.688v-64h-64v42.656H320v42.672H192V95.992 h-42.656V53.336h-64v64H128v21.328H85.344v42.672H42.688v85.328H0v149.328h64v-85.328h21.344v85.328H128v42.672h106.688v-64h-85.344 v-21.328h213.344v21.328h-85.344v64H384v-42.672h42.688v-85.328H448v85.328h64V266.664H469.344z M192,245.336h-64v-64h64V245.336z M384,245.336h-64v-64h64V245.336z"></path>
                    </g>
                  </svg>
                )
              }
            ].map((priority) => (
              <label key={priority.key} className="calm-button-secondary cursor-pointer transition-all duration-200 hover:scale-[0.98] flex items-center justify-center gap-2">
                <input
                  type="radio"
                  name="priority"
                  value={priority.key}
                  checked={habit.priority === priority.key}
                  onChange={(e) => setHabit(prev => ({ ...prev, priority: e.target.value }))}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                  habit.priority === priority.key 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-slate-300'
                }`}>
                  {habit.priority === priority.key && (
                    <div className="w-full h-full rounded-full bg-white scale-50" />
                  )}
                </div>
                <span className="font-medium text-sm flex items-center gap-2" style={{ fontFamily: 'Dosis, sans-serif' }}>
                  {priority.icon}
                  {priority.label}
                </span>
              </label>
            ))}
          </div>
        </div>

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
            <span style={{ fontFamily: 'Dosis, sans-serif' }}>
              {isEditing ? 'Salvar Alterações' : 'Criar Hábito'}
            </span>
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