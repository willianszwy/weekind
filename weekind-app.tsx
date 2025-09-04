import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

const Weekind = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [habits, setHabits] = useState({});
  const [checkins, setCheckins] = useState({});
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: '', type: 'daily', customDays: [] });
  const [dailyTasks, setDailyTasks] = useState({});
  const [dailyTaskCheckins, setDailyTaskCheckins] = useState({});

  // Carregar dados do localStorage
  useEffect(() => {
    const savedHabits = localStorage.getItem('weekind-habits');
    const savedCheckins = localStorage.getItem('weekind-checkins');
    const savedDailyTasks = localStorage.getItem('weekind-daily-tasks');
    const savedDailyCheckins = localStorage.getItem('weekind-daily-checkins');
    
    if (savedHabits) setHabits(JSON.parse(savedHabits));
    if (savedCheckins) setCheckins(JSON.parse(savedCheckins));
    if (savedDailyTasks) setDailyTasks(JSON.parse(savedDailyTasks));
    if (savedDailyCheckins) setDailyTaskCheckins(JSON.parse(savedDailyCheckins));
  }, []);

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem('weekind-habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('weekind-checkins', JSON.stringify(checkins));
  }, [checkins]);

  useEffect(() => {
    localStorage.setItem('weekind-daily-tasks', JSON.stringify(dailyTasks));
  }, [dailyTasks]);

  useEffect(() => {
    localStorage.setItem('weekind-daily-checkins', JSON.stringify(dailyTaskCheckins));
  }, [dailyTaskCheckins]);

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // Inicializar com tarefas de exemplo (apenas na primeira vez)
  useEffect(() => {
    const hasInitialized = localStorage.getItem('weekind-initialized');
    if (!hasInitialized) {
      const today = new Date();
      const dateKey = formatDate(today);
      
      const exampleTasks = [
        { id: '1', text: 'Meditar por 10 minutos', period: 0, priority: 'alta' },
        { id: '2', text: 'Beber 2 copos de água', period: 0, priority: 'media' },
        { id: '3', text: 'Exercitar-se por 30 min', period: 0, priority: 'alta' },
        { id: '4', text: 'Almoço saudável', period: 1, priority: 'media' },
        { id: '5', text: 'Revisar tarefas do dia', period: 1, priority: 'baixa' },
        { id: '6', text: 'Tempo em família', period: 1, priority: 'alta' },
        { id: '7', text: 'Ler por 20 minutos', period: 2, priority: 'baixa' },
        { id: '8', text: 'Preparar roupas de amanhã', period: 2, priority: 'baixissima' },
        { id: '9', text: 'Gratidão - 3 coisas boas', period: 2, priority: 'media' }
      ];
      
      setDailyTasks({ [dateKey]: exampleTasks });
      localStorage.setItem('weekind-initialized', 'true');
    }
  }, []);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const dayNamesComplete = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  const periodNames = ['Manhã', 'Tarde', 'Noite'];
  const periodEmojis = ['🔆', '🕛', '🌜'];
  const priorityColors = {
    'alta': '🔴',
    'media': '🟠',
    'baixa': '🟢',
    'baixissima': '🔵'
  };

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

  const formatDateForDisplay = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const dayName = dayNamesComplete[date.getDay() === 0 ? 6 : date.getDay() - 1];
    return `${day}/${month}/${year}, ${dayName}`;
  };

  const getDailyPerformance = (date) => {
    const dateKey = formatDate(date);
    const tasks = dailyTasks[dateKey] || [];
    if (tasks.length === 0) return 0;
    
    const checkedTasks = tasks.filter(task => dailyTaskCheckins[`${dateKey}_${task.id}`]);
    const percentage = (checkedTasks.length / tasks.length) * 100;
    
    if (percentage < 30) return (
      <svg viewBox="0 -12.02 94.572 94.572" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="w-8 h-8">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <g id="angry" transform="translate(-348.019 -184.357)">
            <path id="Path_38" data-name="Path 38" d="M349.442,219.128c.283-26.649,16.426-33.362,45.857-33.353,29.458.009,45.585,6.732,45.869,33.353.293,27.433-16.714,34.458-46.565,34.333C365.116,253.335,349.158,245.892,349.442,219.128Z" fill="#fff29e" fillRule="evenodd"></path>
            <path id="Path_39" data-name="Path 39" d="M349.442,219.127c.015-1.427.078-2.794.184-4.109,1.853,22.4,17.57,28.84,44.977,28.957,27.8.116,44.46-5.971,46.38-28.97.106,1.319.17,2.69.186,4.122.292,27.434-16.715,34.458-46.566,34.334C365.116,253.335,349.158,245.893,349.442,219.127Z" fill="#1a1818" fillRule="evenodd" opacity="0.15"></path>
            <path id="Path_40" data-name="Path 40" d="M348.023,219.117c.147-13.863,4.477-22.577,12.649-27.858,8.008-5.175,19.647-6.907,34.627-6.9s26.629,1.745,34.642,6.925c8.172,5.282,12.5,13.991,12.646,27.835.152,14.26-4.252,23.255-12.624,28.7-8.211,5.341-20.175,7.124-35.366,7.06-15.02-.064-26.638-2.021-34.54-7.421-8.051-5.5-12.181-14.432-12.034-28.341Zm14.185-25.466c-7.328,4.735-11.212,12.7-11.348,25.488-.136,12.855,3.571,21.031,10.8,25.971,7.377,5.043,18.483,6.871,32.949,6.932,14.66.062,26.125-1.605,33.808-6.6,7.521-4.892,11.474-13.127,11.334-26.3-.136-12.776-4.017-20.741-11.344-25.477-7.485-4.838-18.638-6.465-33.107-6.468C380.849,187.189,369.7,188.81,362.208,193.651Z" fill="#1a1818" fillRule="evenodd"></path>
            <path id="Path_41" data-name="Path 41" d="M383.237,223.551a1.42,1.42,0,0,1-2.147-1.858,18.055,18.055,0,0,1,1.869-1.872,19.148,19.148,0,0,1,24.681,0l0,0a18.077,18.077,0,0,1,1.876,1.878,1.419,1.419,0,0,1-2.146,1.858,15.162,15.162,0,0,0-1.587-1.578v-.006a16.309,16.309,0,0,0-20.97,0A15.238,15.238,0,0,0,383.237,223.551Z" fill="#1a1818" fillRule="evenodd"></path>
            <g id="Group_10" data-name="Group 10">
              <path id="Path_42" data-name="Path 42" d="M371.558,213.838a6.226,6.226,0,1,0-6.226-6.226A6.238,6.238,0,0,0,371.558,213.838Z" fill="#1a1818" fillRule="evenodd"></path>
              <path id="Path_43" data-name="Path 43" d="M370.963,207.222a2,2,0,1,0-2-2A2,2,0,0,0,370.963,207.222Z" fill="#ffffff" fillRule="evenodd"></path>
              <path id="Path_44" data-name="Path 44" d="M368.865,210.541a1.241,1.241,0,1,0-1.24-1.24A1.242,1.242,0,0,0,368.865,210.541Z" fill="#ffffff" fillRule="evenodd"></path>
            </g>
            <g id="Group_11" data-name="Group 11">
              <path id="Path_45" data-name="Path 45" d="M419.049,213.838a6.226,6.226,0,1,0-6.226-6.226A6.238,6.238,0,0,0,419.049,213.838Z" fill="#1a1818" fillRule="evenodd"></path>
              <path id="Path_46" data-name="Path 46" d="M418.455,207.222a2,2,0,1,0-2-2A2,2,0,0,0,418.455,207.222Z" fill="#ffffff" fillRule="evenodd"></path>
              <path id="Path_47" data-name="Path 47" d="M416.356,210.541a1.241,1.241,0,1,0-1.24-1.24A1.243,1.243,0,0,0,416.356,210.541Z" fill="#ffffff" fillRule="evenodd"></path>
            </g>
            <path id="Path_48" data-name="Path 48" d="M374.588,220.233l-6.057,0a1.68,1.68,0,0,1-1.171-2.884,5.753,5.753,0,0,1,7.927-.459,5.439,5.439,0,0,1,.568.568,1.678,1.678,0,0,1-1.267,2.773Z" fill="#eb505e" fillRule="evenodd"></path>
            <path id="Path_49" data-name="Path 49" d="M422.078,220.234H416.02a1.68,1.68,0,0,1-1.163-2.893,5.581,5.581,0,0,1,.462-.449,5.77,5.77,0,0,1,7.458,0,5.474,5.474,0,0,1,.567.56,1.678,1.678,0,0,1-1.266,2.781Z" fill="#eb505e" fillRule="evenodd"></path>
            <path id="Path_50" data-name="Path 50" d="M365.607,200.614a1.421,1.421,0,0,1,1.28-2.537l13.965,7.075a1.421,1.421,0,0,1-1.279,2.537Z" fill="#1a1818" fillRule="evenodd"></path>
            <path id="Path_51" data-name="Path 51" d="M423.724,198.077A1.421,1.421,0,0,1,425,200.614l-13.965,7.075a1.421,1.421,0,0,1-1.279-2.537Z" fill="#1a1818" fillRule="evenodd"></path>
          </g>
        </g>
      </svg>
    );
    if (percentage <= 50) return (
      <svg viewBox="0 -12.02 94.56 94.56" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="w-8 h-8">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <g id="embarrassed" transform="translate(-62.806 -315.87)">
            <path id="Path_176" data-name="Path 176" d="M64.228,350.637c.283-26.645,16.424-33.358,45.851-33.349,29.455.009,45.58,6.732,45.864,33.349.293,27.431-16.712,34.454-46.56,34.329C79.9,384.84,63.943,377.4,64.228,350.637Z" fill="#ecc3dc" fillRule="evenodd"></path>
            <path id="Path_177" data-name="Path 177" d="M64.228,350.637c.015-1.427.078-2.794.184-4.109,1.853,22.4,17.568,28.837,44.971,28.954,27.8.115,44.455-5.971,46.375-28.967.107,1.319.17,2.69.186,4.122.292,27.431-16.713,34.454-46.561,34.33C79.9,384.841,63.944,377.4,64.228,350.637Z" fill="#1a1818" fillRule="evenodd" opacity="0.15"></path>
            <path id="Path_178" data-name="Path 178" d="M62.81,350.626c.147-13.86,4.476-22.574,12.647-27.855,8.007-5.174,19.644-6.9,34.622-6.9s26.627,1.745,34.639,6.924c8.171,5.282,12.5,13.989,12.644,27.832.152,14.259-4.252,23.253-12.623,28.7-8.209,5.341-20.173,7.123-35.361,7.06-15.019-.065-26.635-2.021-34.536-7.421-8.05-5.5-12.18-14.43-12.032-28.338Zm14.182-25.463c-7.327,4.735-11.211,12.7-11.346,25.485-.137,12.854,3.57,21.028,10.8,25.969,7.377,5.041,18.482,6.87,32.946,6.931,14.658.062,26.121-1.606,33.8-6.6,7.519-4.892,11.473-13.126,11.332-26.3-.136-12.774-4.016-20.738-11.342-25.473-7.485-4.838-18.637-6.464-33.1-6.469C95.631,318.7,84.483,320.322,76.992,325.163Z" fill="#1a1818" fillRule="evenodd"></path>
            <g id="Group_46" data-name="Group 46">
              <path id="Path_179" data-name="Path 179" d="M86.341,345.348a6.225,6.225,0,1,0-6.225-6.225A6.237,6.237,0,0,0,86.341,345.348Z" fill="#1a1818" fillRule="evenodd"></path>
              <path id="Path_180" data-name="Path 180" d="M85.747,338.733a2,2,0,1,0-2-2A2,2,0,0,0,85.747,338.733Z" fill="#ffffff" fillRule="evenodd"></path>
              <path id="Path_181" data-name="Path 181" d="M83.649,342.052a1.24,1.24,0,1,0-1.241-1.241A1.243,1.243,0,0,0,83.649,342.052Z" fill="#ffffff" fillRule="evenodd"></path>
            </g>
            <g id="Group_47" data-name="Group 47">
              <path id="Path_182" data-name="Path 182" d="M133.827,345.348a6.225,6.225,0,1,0-6.225-6.225A6.237,6.237,0,0,0,133.827,345.348Z" fill="#1a1818" fillRule="evenodd"></path>
              <path id="Path_183" data-name="Path 183" d="M133.233,338.733a2,2,0,1,0-2-2A2,2,0,0,0,133.233,338.733Z" fill="#ffffff" fillRule="evenodd"></path>
              <path id="Path_184" data-name="Path 184" d="M131.135,342.052a1.24,1.24,0,1,0-1.241-1.241A1.243,1.243,0,0,0,131.135,342.052Z" fill="#ffffff" fillRule="evenodd"></path>
            </g>
            <path id="Path_185" data-name="Path 185" d="M91.736,355.68l-10.782,0a2.99,2.99,0,0,1-2.085-5.134,9.944,9.944,0,0,1,.839-.817,10.262,10.262,0,0,1,13.271,0,9.843,9.843,0,0,1,1.012,1.01,2.988,2.988,0,0,1-2.255,4.937Z" fill="#eb505e" fillRule="evenodd"></path>
            <path id="Path_186" data-name="Path 186" d="M81.89,330.3a1.419,1.419,0,1,1-2.146-1.856,8.322,8.322,0,0,1,.869-.872,8.879,8.879,0,0,1,11.451,0,8.267,8.267,0,0,1,.879.877A1.419,1.419,0,0,1,90.8,330.3a5.61,5.61,0,0,0-.578-.576l-.006-.006a6.033,6.033,0,0,0-7.743,0A5.592,5.592,0,0,0,81.89,330.3Z" fill="#1a1818" fillRule="evenodd"></path>
            <path id="Path_187" data-name="Path 187" d="M129.372,330.3a1.418,1.418,0,1,1-2.145-1.856,8.324,8.324,0,0,1,.869-.872,8.879,8.879,0,0,1,11.457,0,8.357,8.357,0,0,1,.873.872,1.419,1.419,0,0,1-2.146,1.856,5.527,5.527,0,0,0-.584-.582,6.033,6.033,0,0,0-7.743,0A5.6,5.6,0,0,0,129.372,330.3Z" fill="#1a1818" fillRule="evenodd"></path>
            <path id="Path_188" data-name="Path 188" d="M102.144,356.919c-.476,0-.862-.633-.862-1.413s.386-1.413.862-1.413h15.882c.476,0,.862.633.862,1.413s-.386,1.413-.862,1.413Z" fill="#1a1818" fillRule="evenodd"></path>
            <path id="Path_189" data-name="Path 189" d="M139.22,355.68l-10.781,0a2.991,2.991,0,0,1-2.086-5.134,10.238,10.238,0,0,1,14.11-.817,9.647,9.647,0,0,1,1.012,1.01,2.982,2.982,0,0,1-.3,4.2A3.014,3.014,0,0,1,139.22,355.68Z" fill="#eb505e" fillRule="evenodd"></path>
          </g>
        </g>
      </svg>
    );
    if (percentage <= 75) return (
      <svg viewBox="0 -12.02 94.572 94.572" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="w-8 h-8">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <g id="happy" transform="translate(-62.8 -53.014)">
            <path id="Path_1" data-name="Path 1" d="M64.223,87.785c.283-26.649,16.426-33.362,45.857-33.353,29.458.009,45.585,6.732,45.869,33.353.293,27.433-16.715,34.458-46.566,34.333C79.9,121.992,63.938,114.549,64.223,87.785Z" fill="#a4d4b2" fillRule="evenodd"></path>
            <path id="Path_2" data-name="Path 2" d="M64.223,87.785c.015-1.428.078-2.8.184-4.11,1.853,22.4,17.569,28.84,44.977,28.957,27.8.116,44.46-5.971,46.379-28.97.107,1.319.171,2.69.186,4.123.292,27.433-16.714,34.458-46.565,34.333C79.9,121.992,63.939,114.55,64.223,87.785Z" fill="#1a1818" fillRule="evenodd" opacity="0.15"></path>
            <path id="Path_3" data-name="Path 3" d="M62.8,87.774c.147-13.863,4.477-22.577,12.649-27.858,8.008-5.175,19.647-6.907,34.627-6.9s26.629,1.745,34.642,6.925c8.172,5.282,12.5,13.991,12.646,27.835.152,14.26-4.252,23.255-12.625,28.7-8.21,5.341-20.175,7.124-35.365,7.06-15.021-.064-26.638-2.02-34.54-7.422-8.051-5.5-12.182-14.431-12.034-28.34ZM76.988,62.308C69.661,67.043,65.776,75.01,65.641,87.8c-.137,12.855,3.57,21.031,10.8,25.971,7.377,5.043,18.483,6.871,32.949,6.932,14.66.062,26.125-1.606,33.808-6.6,7.52-4.893,11.474-13.128,11.334-26.3-.137-12.776-4.017-20.74-11.344-25.477-7.485-4.838-18.638-6.464-33.107-6.469C95.63,55.846,84.48,57.467,76.988,62.308Z" fill="#1a1818" fillRule="evenodd"></path>
            <path id="Path_4" data-name="Path 4" d="M95.871,86.318a1.419,1.419,0,1,1,2.146-1.857,15.345,15.345,0,0,0,1.58,1.584,16.308,16.308,0,0,0,20.969,0,15.318,15.318,0,0,0,1.588-1.584,1.419,1.419,0,1,1,2.146,1.857,17.937,17.937,0,0,1-1.877,1.873,19.151,19.151,0,0,1-24.683,0A17.964,17.964,0,0,1,95.871,86.318Z" fill="#1a1818" fillRule="evenodd"></path>
            <path id="Path_5" data-name="Path 5" d="M89.369,88.893l-6.057,0a1.68,1.68,0,0,1-1.172-2.884,5.753,5.753,0,0,1,7.928-.46,5.537,5.537,0,0,1,.568.568,1.678,1.678,0,0,1-1.267,2.773Z" fill="#eb505e" fillRule="evenodd"></path>
            <path id="Path_6" data-name="Path 6" d="M136.858,88.895H130.8A1.68,1.68,0,0,1,129.638,86a5.438,5.438,0,0,1,.462-.45,5.77,5.77,0,0,1,7.458,0,5.575,5.575,0,0,1,.567.56,1.68,1.68,0,0,1-1.267,2.782Z" fill="#eb505e" fillRule="evenodd"></path>
            <g id="Group_1" data-name="Group 1">
              <path id="Path_7" data-name="Path 7" d="M86.342,82.325A6.226,6.226,0,1,0,80.116,76.1,6.237,6.237,0,0,0,86.342,82.325Z" fill="#1a1818" fillRule="evenodd"></path>
              <path id="Path_8" data-name="Path 8" d="M85.747,75.709a2,2,0,1,0-2-2A2,2,0,0,0,85.747,75.709Z" fill="#ffffff" fillRule="evenodd"></path>
              <path id="Path_9" data-name="Path 9" d="M83.649,79.028a1.241,1.241,0,1,0-1.241-1.24A1.242,1.242,0,0,0,83.649,79.028Z" fill="#ffffff" fillRule="evenodd"></path>
            </g>
            <g id="Group_2" data-name="Group 2">
              <path id="Path_10" data-name="Path 10" d="M133.83,82.325A6.226,6.226,0,1,0,127.6,76.1,6.238,6.238,0,0,0,133.83,82.325Z" fill="#1a1818" fillRule="evenodd"></path>
              <path id="Path_11" data-name="Path 11" d="M133.236,75.709a2,2,0,1,0-2-2A2,2,0,0,0,133.236,75.709Z" fill="#ffffff" fillRule="evenodd"></path>
              <path id="Path_12" data-name="Path 12" d="M131.137,79.028a1.241,1.241,0,1,0-1.241-1.24A1.243,1.243,0,0,0,131.137,79.028Z" fill="#ffffff" fillRule="evenodd"></path>
            </g>
          </g>
        </g>
      </svg>
    );
    if (percentage < 100) return '🙃';
    return '👑';
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

  const addDailyTask = (period, text, priority = 'baixa') => {
    const today = new Date();
    const dateKey = formatDate(today);
    const taskId = Date.now().toString();
    
    const newTask = {
      id: taskId,
      text,
      period,
      priority,
      completed: false
    };
    
    setDailyTasks(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newTask]
    }));
  };

  const toggleDailyTask = (taskId) => {
    const today = new Date();
    const dateKey = formatDate(today);
    const checkinKey = `${dateKey}_${taskId}`;
    
    setDailyTaskCheckins(prev => ({
      ...prev,
      [checkinKey]: !prev[checkinKey]
    }));
  };

  const getTodayTasks = () => {
    const today = new Date();
    const dateKey = formatDate(today);
    return dailyTasks[dateKey] || [];
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
        {/* Header separado */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">
            📅 Weekind
          </h1>
          <p className="text-xl text-white/80">
            Seu companheiro de hábitos e produtividade
          </p>
        </div>

        {/* Card Status do Dia */}
        <div className="mb-6" style={glassStyle}>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Status do Dia
            </h2>
            <p className="text-lg text-white/90 mb-4">
              {formatDateForDisplay(new Date())}
            </p>
            <div className="text-6xl mb-2">
              {getDailyPerformance(new Date())}
            </div>
          </div>
        </div>

        {/* Card Meu Dia */}
        <div className="mb-6" style={glassStyle}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Meu Dia
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {periodNames.map((period, periodIndex) => {
                const periodTasks = getTodayTasks().filter(task => task.period === periodIndex);
                
                return (
                  <div key={period} className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-4 text-center">
                      {periodEmojis[periodIndex]} {period}
                    </h3>
                    
                    <div className="space-y-2">
                      {periodTasks.map(task => {
                        const today = new Date();
                        const dateKey = formatDate(today);
                        const checkinKey = `${dateKey}_${task.id}`;
                        const isChecked = dailyTaskCheckins[checkinKey];
                        
                        return (
                          <div 
                            key={task.id} 
                            className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-white/10"
                            onClick={() => toggleDailyTask(task.id)}
                          >
                            <span className="text-lg">
                              {isChecked ? '🔘' : priorityColors[task.priority]}
                            </span>
                            <span className={`text-white flex-1 ${isChecked ? 'line-through opacity-70' : ''}`}>
                              {task.text}
                            </span>
                          </div>
                        );
                      })}
                      
                      {periodTasks.length === 0 && (
                        <p className="text-white/60 text-center py-4">
                          Nenhuma tarefa para {period.toLowerCase()}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card do Calendário Mensal */}
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
              
              <h2 className="text-2xl font-semibold text-white">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              
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