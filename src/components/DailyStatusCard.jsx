import React from 'react';

const DailyStatusCard = ({ habits, checkins }) => {
  const formatDateForDisplay = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const dayNamesComplete = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const dayName = dayNamesComplete[date.getDay()];
    return `${day}/${month}/${year}, ${dayName}`;
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getCurrentWeekKey = () => {
    const today = new Date();
    // Encontrar início da semana (domingo)
    const startOfWeek = new Date(today);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day; // Domingo = 0, então não precisa ajuste
    startOfWeek.setDate(diff);
    
    // Encontrar fim da semana (sábado)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return `${formatDate(startOfWeek)}_${formatDate(endOfWeek)}`;
  };

  const getPerformanceIcon = (percentage) => {
    if (percentage < 30) {
      return (
        <svg viewBox="0 -12.02 94.572 94.572" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="w-32 h-32">
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
    } else if (percentage <= 50) {
      return (
        <svg viewBox="0 -12.02 94.56 94.56" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="w-32 h-32">
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
    } else if (percentage <= 75) {
      return (
        <svg viewBox="0 -12.02 94.572 94.572" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="w-32 h-32">
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
    } else if (percentage < 100) {
      return <span className="text-8xl">🙃</span>;
    } else {
      return (
        <svg viewBox="0 -12.02 94.56 94.56" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="w-32 h-32">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g id="excited" transform="translate(-490.634 -446.908)">
              <path id="Path_112" data-name="Path 112" d="M492.056,481.676c.283-26.646,16.425-33.358,45.852-33.349,29.455.008,45.58,6.731,45.864,33.349.293,27.43-16.713,34.454-46.56,34.329C507.728,515.879,491.772,508.437,492.056,481.676Z" fill="#9b88bf" fillRule="evenodd"></path>
              <path id="Path_113" data-name="Path 113" d="M492.056,481.675c.016-1.427.079-2.794.184-4.109,1.853,22.4,17.568,28.837,44.972,28.954,27.8.116,44.455-5.971,46.375-28.967.106,1.32.17,2.69.185,4.122.293,27.431-16.713,34.454-46.56,34.33C507.728,515.879,491.772,508.438,492.056,481.675Z" fill="#1a1818" fillRule="evenodd" opacity="0.15"></path>
              <path id="Path_114" data-name="Path 114" d="M490.638,481.665c.147-13.861,4.476-22.575,12.647-27.855,8.007-5.174,19.645-6.906,34.623-6.9s26.626,1.745,34.639,6.925c8.17,5.281,12.495,13.989,12.643,27.832.152,14.259-4.251,23.253-12.623,28.7-8.208,5.34-20.172,7.122-35.361,7.059-15.018-.064-26.635-2.021-34.536-7.421-8.05-5.5-12.179-14.429-12.032-28.337ZM504.821,456.2c-7.327,4.734-11.211,12.7-11.347,25.485-.136,12.853,3.571,21.028,10.8,25.968,7.376,5.042,18.481,6.87,32.945,6.932,14.658.061,26.122-1.606,33.8-6.6,7.52-4.891,11.473-13.125,11.333-26.3-.136-12.774-4.016-20.738-11.343-25.474-7.484-4.838-18.636-6.464-33.1-6.468C523.46,449.741,512.312,451.361,504.821,456.2Z" fill="#1a1818" fillRule="evenodd"></path>
              <path id="Path_115" data-name="Path 115" d="M517.2,482.784l-6.057,0a1.679,1.679,0,0,1-1.171-2.883,5.833,5.833,0,0,1,.471-.46,5.769,5.769,0,0,1,7.455,0,5.538,5.538,0,0,1,.568.568,1.678,1.678,0,0,1-1.266,2.773Z" fill="#eb505e" fillRule="evenodd"></path>
              <path id="Path_116" data-name="Path 116" d="M564.683,482.785h-6.057a1.679,1.679,0,0,1-1.162-2.892,5.439,5.439,0,0,1,.462-.45,5.768,5.768,0,0,1,7.457,0,5.576,5.576,0,0,1,.567.56,1.678,1.678,0,0,1-1.267,2.781Z" fill="#eb505e" fillRule="evenodd"></path>
              <path id="Path_117" data-name="Path 117" d="M547.813,479.336l0,.217a12.315,12.315,0,0,1-2.862,8.03,9.012,9.012,0,0,1-14.079,0,12.323,12.323,0,0,1-2.865-8.03l.006-.279a.709.709,0,0,1,.709-.7l18.378,0a.713.713,0,0,1,.713.712Z" fill="#1a1818" fillRule="evenodd"></path>
              <path id="Path_118" data-name="Path 118" d="M514.169,457.235l2.972,6.155,6.772.924-4.935,4.728,1.213,6.726-6.022-3.233-6.022,3.233,1.213-6.726-4.935-4.728,6.772-.924Z" fill="#ffcd37" fillRule="evenodd"></path>
              <g id="Group_30" data-name="Group 30">
                <path id="Path_119" data-name="Path 119" d="M514.468,463.941a1.995,1.995,0,1,1-1.995,1.995A1.995,1.995,0,0,1,514.468,463.941Z" fill="#ffffff" fillRule="evenodd"></path>
                <path id="Path_120" data-name="Path 120" d="M512.37,471.251a1.241,1.241,0,1,0-1.24-1.241A1.243,1.243,0,0,0,512.37,471.251Z" fill="#ffffff" fillRule="evenodd"></path>
              </g>
              <g id="Group_32" data-name="Group 32">
                <path id="Path_121" data-name="Path 121" d="M561.655,457.235l2.972,6.155,6.772.924-4.935,4.728,1.213,6.726-6.022-3.233-6.022,3.233,1.213-6.726-4.935-4.728,6.773-.924Z" fill="#ffcd37" fillRule="evenodd"></path>
                <g id="Group_31" data-name="Group 31">
                  <path id="Path_122" data-name="Path 122" d="M561.954,467.931a1.995,1.995,0,1,0-2-1.995A2,2,0,0,0,561.954,467.931Z" fill="#ffffff" fillRule="evenodd"></path>
                  <path id="Path_123" data-name="Path 123" d="M559.856,471.251a1.241,1.241,0,1,0-1.24-1.241A1.243,1.243,0,0,0,559.856,471.251Z" fill="#ffffff" fillRule="evenodd"></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      );
    }
  };

  const getDailyPerformance = (date) => {
    const weekKey = getCurrentWeekKey();
    const weekHabits = habits[weekKey] || [];
    if (weekHabits.length === 0) return { icon: getPerformanceIcon(0), percentage: 0 };
    
    const dayIndex = date.getDay(); // Domingo=0, Segunda=1, ..., Sábado=6
    let totalHabits = 0;
    let completedHabits = 0;
    
    weekHabits.forEach(habit => {
      const checkinKey = `${weekKey}_${habit.id}`;
      const habitCheckins = checkins[checkinKey] || {};
      
      if (habit.type === 'daily') {
        totalHabits++;
        if (habitCheckins[dayIndex]) completedHabits++;
      } else if (habit.type === 'custom' && habit.customDays.includes(dayIndex)) {
        totalHabits++;
        if (habitCheckins[dayIndex]) completedHabits++;
      }
    });
    
    const percentage = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;
    
    return { icon: getPerformanceIcon(percentage), percentage: Math.round(percentage) };
  };

  const today = new Date();
  const performance = getDailyPerformance(today);

  return (
    <div className="calm-glass" style={{ backgroundColor: '#e2edeb' }}>
      <div className="p-8 text-center">
        <h2 className="text-2xl font-medium calm-text-primary mb-4" style={{ fontFamily: 'Asimovian, sans-serif' }}>
          Status do Dia
        </h2>
        <p className="text-lg calm-text-secondary mb-6" style={{ fontFamily: 'Dosis, sans-serif' }}>
          {formatDateForDisplay(today)}
        </p>
        <div className="flex flex-col items-center gap-2">
          <div className="mb-2">
            {performance.icon}
          </div>
          <p className="text-sm calm-text-secondary" style={{ fontFamily: 'Dosis, sans-serif' }}>
            {performance.percentage}% dos hábitos concluídos
          </p>
          <br />
          <p className="text-sm calm-text-muted italic" style={{ fontFamily: 'Dosis, sans-serif' }}>
            "All we have to decide is what to do with the time that is given us." - Gandalf
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyStatusCard;