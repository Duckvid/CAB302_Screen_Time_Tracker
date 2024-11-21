import React, { useEffect } from 'react';

import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

import QuestionsJSON from '../Questions.json';
import './SurveyReact.css';
// import 'survey-core/defaultV2.min.css';
import './defaultV2.css';
import toSurveryData from './toSurveryData';

StylesManager.applyTheme('defaultV2');

function loadState(survey, res) {
  if (res.currentPageNo) survey.currentPageNo = res.currentPageNo;
  if (res.data) survey.data = toSurveryData(res.data);
}

function SurveyReact({
  onPageChanged,
  onComplete,
  onValidatedErrorsOnCurrentPage,
  defaultValue,
}) {
  const survey = new Model(QuestionsJSON);

  useEffect(() => {
    if (defaultValue) {
      loadState(survey, defaultValue);
    }
    // eslint-disable-next-line
  }, [defaultValue]);

  survey.onCurrentPageChanged.add((sender, options) => {
    if (onPageChanged instanceof Function) {
      onPageChanged(sender, options);
    }
  });
  survey.onComplete.add((sender) => {
    if (onComplete instanceof Function) {
      onComplete(sender);
    }
  });
  survey.onValidatedErrorsOnCurrentPage.add((sender) => {
    if (onValidatedErrorsOnCurrentPage instanceof Function) {
      onValidatedErrorsOnCurrentPage(sender);
    }
  });

  return (
    <>
      <Survey
        model={survey}
        style={{ paddingTop: '10px', marginBottom: 0 }}
        showProgressBar="none"
        focusFirstQuestionAutomatic={false}
        showCompletedPage={false}
      />
    </>
  );
}

export default SurveyReact;
