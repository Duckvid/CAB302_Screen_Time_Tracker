import cloneDeep from 'lodash.clonedeep';
import surveyDataStructure from './surveyDataStructure';

function toSurveryData(data) {
  const _surveyDataStructure = cloneDeep(surveyDataStructure);

  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (key in _surveyDataStructure) {
      _surveyDataStructure[key] = value;
    } else {
      Object.keys(_surveyDataStructure).forEach((dKey) => {
        const dValue = _surveyDataStructure[dKey];
        if (dValue && typeof dValue === 'object') {
          if (key in dValue) {
            dValue[key] = value;
          }
        }
      });
    }
  });

  return _surveyDataStructure;
}

export default toSurveryData;
