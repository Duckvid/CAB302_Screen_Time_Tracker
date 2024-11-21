import React, { useRef, useEffect } from 'react';
import { Box } from '@material-ui/core';
import NavBar from '../components/NavBar';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { getResponse } from '../utils/getResponse';
import Grid from '@material-ui/core/Grid';
import Progress from '@material-ui/core/LinearProgress';
import { format } from 'date-fns';
import ResultFeedback from '../components/resultFeedback.json';
import { Bar, Radar } from 'react-chartjs-2';
import Footer from '../components/Footer';
import Button from '@material-ui/core/Button';
import ReactToPrint from 'react-to-print';
import { Link } from 'react-router-dom';
import calculateResults from '../utils/calculated';
import { isMobile } from '../utils/util';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ResultExtended(props) {
  const componentRef = useRef();
  //store data of MotivationAtWork
  const [MotivationAtWorkIntrinsic, setMotivationAtWorkIntrinsic] =
    React.useState(0);
  const [MotivationAtWorkIdentified, setMotivationAtWorkIdentified] =
    React.useState(0);
  const [MotivationAtWorkIntrojected, setMotivationAtWorkIntrojected] =
    React.useState(0);
  const [
    MotivationAtWorkExternalMotivation,
    setMotivationAtWorkExternalMotivation,
  ] = React.useState(0);
  //store data of EntrepreneurialPassion
  const [EntrepreneurialPassionInventing, setEntrepreneurialPassionInventing] =
    React.useState(0);
  const [EntrepreneurialPassionFounding, setEntrepreneurialPassionFounding] =
    React.useState(0);
  const [
    EntrepreneurialPassionDeveloping,
    setEntrepreneurialPassionDeveloping,
  ] = React.useState(0);
  //store data of IndividualEntrepreneurialOrientation
  const [
    IndividualEntrepreneurialOrientationRiskTaking,
    setIndividualEntrepreneurialOrientationRiskTaking,
  ] = React.useState(0);
  const [
    IndividualEntrepreneurialOrientationInnovativeness,
    setIndividualEntrepreneurialOrientationInnovativeness,
  ] = React.useState(0);
  const [
    IndividualEntrepreneurialOrientationProactivity,
    setIndividualEntrepreneurialOrientationProactivity,
  ] = React.useState(0);
  // //store data of EntrepreneurialSelfEfficacy
  const [
    EntrepreneurialSelfEfficacySearching,
    setEntrepreneurialSelfEfficacySearching,
  ] = React.useState(0);
  const [
    EntrepreneurialSelfEfficacyPlanning,
    setEntrepreneurialSelfEfficacyPlanning,
  ] = React.useState(0);
  const [
    EntrepreneurialSelfEfficacyMarshaling,
    setEntrepreneurialSelfEfficacyMarshaling,
  ] = React.useState(0);
  const [
    EntrepreneurialSelfEfficacyImplementingPeople,
    setEntrepreneurialSelfEfficacyImplementingPeople,
  ] = React.useState(0);
  const [
    EntrepreneurialSelfEfficacyImplementingFinancial,
    setEntrepreneurialSelfEfficacyImplementingFinancial,
  ] = React.useState(0);
  // //store data of FearOfFailure
  const [
    FearOfFailureAbilityToFundTheVenture,
    setFearOfFailureAbilityToFundTheVenture,
  ] = React.useState(0);
  const [FearOfFailurePotentialOfTheIdea, setFearOfFailurePotentialOfTheIdea] =
    React.useState(0);
  const [
    FearOfFailureThreatToSocialEsteem,
    setFearOfFailureThreatToSocialEsteem,
  ] = React.useState(0);
  const [FearOfFailureOpportunityCosts, setFearOfFailureOpportunityCosts] =
    React.useState(0);
  const [FearOfFailurePersonalAbility, setFearOfFailurePersonalAbility] =
    React.useState(0);
  const [FearOfFailureFinancialSecurity, setFearOfFailureFinancialSecurity] =
    React.useState(0);
  const [FearOfFailureVenturesCapacity, setFearOfFailureVenturesCapacity] =
    React.useState(0);
  // //store data of TheBigFive
  const [TheBigFiveExtraversion, setTheBigFiveExtraversion] = React.useState(0);
  const [TheBigFiveAgreeableness, setTheBigFiveAgreeableness] =
    React.useState(0);
  const [TheBigFiveConscientiousness, setTheBigFiveConscientiousness] =
    React.useState(0);
  const [TheBigFiveNeuroticism, setTheBigFiveNeuroticism] = React.useState(0);
  const [TheBigFiveOpenness, setTheBigFiveOpenness] = React.useState(0);
  // Growth Orientation
  const [GrowthOrientationValue, setGrowthOrientationValue] = React.useState(0);
  // Growth Mindset
  const [GrowthMindsetValue, setGrowthMindsetValue] = React.useState(0);
  // Cognitive Flexibility
  const [CognitiveFlexibilityValue, setCognitiveFlexibilityValue] = React.useState(0);
  // Grit
  const [GritValue, setGritValue] = React.useState(0);
  // Resilience
  const [ResilienceValue, setResilienceValue] = React.useState(0);
  // store RuleBreaking data
  const [RuleBreakingValue, setRuleBreakingValue] = React.useState(0);
  // Empathy
  const [EmpathyValue, setEmpathyValue] = React.useState(0);
  //Need To Achieve
  const [NeedToAchieveValue, setNeedToAchieveValue] = React.useState(0);
  //Imposter Syndrome
  const [ImposterSyndromeValue, setImposterSyndromeValue] = React.useState(0);
  // Tolerate Ambiguity
  const [ToleranceForAmbiguityValue, setToleranceForAmbiguityValue] =
  React.useState(0);
  // store Curiosity data
  const [CuriosityJoyousExploration, setCuriosityJoyousExploration] =
  React.useState(0);
  const [CuriosityDeprivationSensitivity, setCuriosityDeprivationSensitivity] =
  React.useState(0);
  const [CuriosityStressTolerance, setCuriosityStressTolerance] = React.useState(0);
  const [CuriosityThrillSeeking, setCuriosityThrillSeeking] = React.useState(0);
  const [CuriosityOvertSocial, setCuriosityOvertSocial] = React.useState(0);
  const [CuriosityCovertSocial, setCuriosityCovertSocial] = React.useState(0);
  // Passion scale constants
  const [HarmoniousPassionValue, setHarmoniousPassionValue] = React.useState(0);
  const [ObsessivePassionValue, setObsessivePassionValue] = React.useState(0);

  function getall() {
    fetch('/api/results/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        // get MotivationAtWork
        let MotivationAtWorkIntrinsic = 0;
        let MotivationAtWorkIdentified = 0;
        let MotivationAtWorkIntrojected = 0;
        let MotivationAtWorkExternalMotivation = 0;
        //EntrepreneurialPassion
        let EntrepreneurialPassionInventing = 0;
        let EntrepreneurialPassionFounding = 0;
        let EntrepreneurialPassionDeveloping = 0;
        //IndividualEntrepreneurialOrientation
        let IndividualEntrepreneurialOrientationRiskTaking = 0;
        let IndividualEntrepreneurialOrientationInnovativeness = 0;
        let IndividualEntrepreneurialOrientationProactivity = 0;
        //EntrepreneurialSelfEfficacy
        let EntrepreneurialSelfEfficacySearching = 0;
        let EntrepreneurialSelfEfficacyPlanning = 0;
        let EntrepreneurialSelfEfficacyMarshaling = 0;
        let EntrepreneurialSelfEfficacyImplementingPeople = 0;
        let EntrepreneurialSelfEfficacyImplementingFinancial = 0;
        //FearOfFailure
        let FearOfFailureAbilityToFundTheVenture = 0;
        let FearOfFailurePotentialOfTheIdea = 0;
        let FearOfFailureThreatToSocialEsteem = 0;
        let FearOfFailureOpportunityCosts = 0;
        let FearOfFailurePersonalAbility = 0;
        let FearOfFailureFinancialSecurity = 0;
        let FearOfFailureVenturesCapacity = 0;
        //TheBigFive
        let TheBigFiveExtraversion = 0;
        let TheBigFiveAgreeableness = 0;
        let TheBigFiveConscientiousness = 0;
        let TheBigFiveNeuroticism = 0;
        let TheBigFiveOpenness = 0;
        // Curiosity
        let CuriosityJoyousExploration = 0;
        let CuriosityDeprivationSensitivity = 0;
        let CuriosityStressTolerance = 0;
        let CuriosityThrillSeeking = 0;
        let CuriosityCovertSocial = 0;
        let CuriosityOvertSocial = 0;
        // Well-Rounded Cognitive Function
        let GrowthOrientationValue = 0;
        let GrowthMindsetValue = 0;
        let CognitiveFlexibilityValue = 0;
        let GritValue = 0;
        let ResilienceValue = 0;
        // RuleBreaking
        let RuleBreakingValue = 0;
        // Adaptive Success
        let EmpathyValue = 0;
        let NeedToAchieveValue = 0;
        let ImposterSyndromeValue = 0;
        let ToleranceForAmbiguityValue = 0;
        // Passion
        let HarmoniousPassionValue = 0;
        let ObsessivePassionValue = 0;

        for (let i = 0; i < data.length - 1; i++) {
          //MotivationAtWork
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.MotivationAtWork.Intrinsic
            )
          ) {
            MotivationAtWorkIntrinsic += calculateResults(data[i]).resultSet
              .MotivationAtWork.Intrinsic;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.MotivationAtWork.Identified
            )
          ) {
            MotivationAtWorkIdentified += calculateResults(data[i]).resultSet
              .MotivationAtWork.Identified;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.MotivationAtWork.Introjected
            )
          ) {
            MotivationAtWorkIntrojected += calculateResults(data[i]).resultSet
              .MotivationAtWork.Introjected;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.MotivationAtWork
                .ExternalMotivation
            )
          ) {
            MotivationAtWorkExternalMotivation += calculateResults(data[i])
              .resultSet.MotivationAtWork.ExternalMotivation;
          }
          //EntrepreneurialPassion
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.EntrepreneurialPassion
                .Inventing
            )
          ) {
            EntrepreneurialPassionInventing += calculateResults(data[i])
              .resultSet.EntrepreneurialPassion.Inventing;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.EntrepreneurialPassion
                .Founding
            )
          ) {
            EntrepreneurialPassionFounding += calculateResults(data[i])
              .resultSet.EntrepreneurialPassion.Founding;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.EntrepreneurialPassion
                .Developing
            )
          ) {
            EntrepreneurialPassionDeveloping += calculateResults(data[i])
              .resultSet.EntrepreneurialPassion.Developing;
          }
          //IndividualEntrepreneurialOrientation
          if (
            !isNaN(
              calculateResults(data[i]).resultSet
                .IndividualEntrepreneurialOrientation.RiskTaking
            )
          ) {
            IndividualEntrepreneurialOrientationRiskTaking += calculateResults(
              data[i]
            ).resultSet.IndividualEntrepreneurialOrientation.RiskTaking;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet
                .IndividualEntrepreneurialOrientation.Innovativeness
            )
          ) {
            IndividualEntrepreneurialOrientationInnovativeness +=
              calculateResults(data[i]).resultSet
                .IndividualEntrepreneurialOrientation.Innovativeness;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet
                .IndividualEntrepreneurialOrientation.Proactivity
            )
          ) {
            IndividualEntrepreneurialOrientationProactivity += calculateResults(
              data[i]
            ).resultSet.IndividualEntrepreneurialOrientation.Proactivity;
          }
          //EntrepreneurialSelfEfficacy
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.EntrepreneurialSelfEfficacy
                .Searching
            )
          ) {
            EntrepreneurialSelfEfficacySearching += calculateResults(data[i])
              .resultSet.EntrepreneurialSelfEfficacy.Searching;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.EntrepreneurialSelfEfficacy
                .Planning
            )
          ) {
            EntrepreneurialSelfEfficacyPlanning += calculateResults(data[i])
              .resultSet.EntrepreneurialSelfEfficacy.Planning;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.EntrepreneurialSelfEfficacy
                .Marshaling
            )
          ) {
            EntrepreneurialSelfEfficacyMarshaling += calculateResults(data[i])
              .resultSet.EntrepreneurialSelfEfficacy.Marshaling;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.EntrepreneurialSelfEfficacy
                .ImplementingPeople
            )
          ) {
            EntrepreneurialSelfEfficacyImplementingPeople += calculateResults(
              data[i]
            ).resultSet.EntrepreneurialSelfEfficacy.ImplementingPeople;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.EntrepreneurialSelfEfficacy
                .ImplementingFinancial
            )
          ) {
            EntrepreneurialSelfEfficacyImplementingFinancial +=
              calculateResults(data[i]).resultSet.EntrepreneurialSelfEfficacy
                .ImplementingFinancial;
          }
          //FearOfFailure
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.FearOfFailure
                .AbilityToFundTheVenture
            )
          ) {
            FearOfFailureAbilityToFundTheVenture += calculateResults(data[i])
              .resultSet.FearOfFailure.AbilityToFundTheVenture;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.FearOfFailure
                .PotentialOfTheIdea
            )
          ) {
            FearOfFailurePotentialOfTheIdea += calculateResults(data[i])
              .resultSet.FearOfFailure.PotentialOfTheIdea;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.FearOfFailure
                .ThreatToSocialEsteem
            )
          ) {
            FearOfFailureThreatToSocialEsteem += calculateResults(data[i])
              .resultSet.FearOfFailure.ThreatToSocialEsteem;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.FearOfFailure.OpportunityCosts
            )
          ) {
            FearOfFailureOpportunityCosts += calculateResults(data[i]).resultSet
              .FearOfFailure.OpportunityCosts;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.FearOfFailure.PersonalAbility
            )
          ) {
            FearOfFailurePersonalAbility += calculateResults(data[i]).resultSet
              .FearOfFailure.PersonalAbility;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.FearOfFailure
                .FinancialSecurity
            )
          ) {
            FearOfFailureFinancialSecurity += calculateResults(data[i])
              .resultSet.FearOfFailure.FinancialSecurity;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.FearOfFailure.VenturesCapacity
            )
          ) {
            FearOfFailureVenturesCapacity += calculateResults(data[i]).resultSet
              .FearOfFailure.VenturesCapacity;
          }
          //TheBigFive
          if (
            !isNaN(calculateResults(data[i]).resultSet.TheBigFive.Extraversion)
          ) {
            TheBigFiveExtraversion += calculateResults(data[i]).resultSet
              .TheBigFive.Extraversion;
          }
          if (
            !isNaN(calculateResults(data[i]).resultSet.TheBigFive.Agreeableness)
          ) {
            TheBigFiveAgreeableness += calculateResults(data[i]).resultSet
              .TheBigFive.Agreeableness;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.TheBigFive.Conscientiousness
            )
          ) {
            TheBigFiveConscientiousness += calculateResults(data[i]).resultSet
              .TheBigFive.Conscientiousness;
          }
          if (
            !isNaN(calculateResults(data[i]).resultSet.TheBigFive.Neuroticism)
          ) {
            TheBigFiveNeuroticism += calculateResults(data[i]).resultSet
              .TheBigFive.Neuroticism;
          }
          if (!isNaN(calculateResults(data[i]).resultSet.TheBigFive.Openness)) {
            TheBigFiveOpenness += calculateResults(data[i]).resultSet.TheBigFive
              .Openness;
          }
          // Curiosity
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.Curiosity.JoyousExploration
            )
          ) {
            CuriosityJoyousExploration += calculateResults(data[i]).resultSet
              .Curiosity.JoyousExploration;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.Curiosity
                .DeprivationSensitivity
            )
          ) {
            CuriosityDeprivationSensitivity += calculateResults(data[i])
              .resultSet.Curiosity.DeprivationSensitivity;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.Curiosity.StressTolerance
            )
          ) {
            CuriosityStressTolerance += calculateResults(data[i]).resultSet
              .Curiosity.StressTolerance;
          }
          if (
            !isNaN(calculateResults(data[i]).resultSet.Curiosity.ThrillSeeking)
          ) {
            CuriosityThrillSeeking += calculateResults(data[i]).resultSet
              .Curiosity.ThrillSeeking;
          }
          if (
            !isNaN(calculateResults(data[i]).resultSet.Curiosity.OvertSocial)
          ) {
            CuriosityOvertSocial += calculateResults(data[i]).resultSet
              .Curiosity.OvertSocial;
          }
          if (
            !isNaN(calculateResults(data[i]).resultSet.Curiosity.CovertSocial)
          ) {
            CuriosityCovertSocial += calculateResults(data[i]).resultSet
              .Curiosity.CovertSocial;
          }
          // Well-Rounded Cognitive Function
          if (
            !isNaN(calculateResults(data[i]).resultSet.GrowthOrientation.Total)
          ) {
            GrowthOrientationValue += calculateResults(data[i]).resultSet
              .GrowthOrientation.Total;
          }
          if (!isNaN(calculateResults(data[i]).resultSet.GrowthMindset.Total)) {
            GrowthMindsetValue += calculateResults(data[i]).resultSet
              .GrowthMindset.Total;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.CognitiveFlexibility.Total
            )
          ) {
            CognitiveFlexibilityValue += calculateResults(data[i]).resultSet
              .CognitiveFlexibility.Total;
          }
          if (!isNaN(calculateResults(data[i]).resultSet.Grit.Total)) {
            GritValue += calculateResults(data[i]).resultSet.Grit.Total;
          }
          if (!isNaN(calculateResults(data[i]).resultSet.Resilience.Total)) {
            ResilienceValue += calculateResults(data[i]).resultSet.Resilience
              .Total;
          }
          // RuleBreaking
          if (!isNaN(calculateResults(data[i]).resultSet.RuleBreaking.Total)) {
            RuleBreakingValue += calculateResults(data[i]).resultSet
              .RuleBreaking.Total;
          }
          // Adaptive Success
          if (!isNaN(calculateResults(data[i]).resultSet.Empathy.Total)) {
            EmpathyValue += calculateResults(data[i]).resultSet.Empathy.Total;
          }
          if (!isNaN(calculateResults(data[i]).resultSet.NeedToAchieve.Total)) {
            NeedToAchieveValue += calculateResults(data[i]).resultSet
              .NeedToAchieve.Total;
          }
          if (
            !isNaN(calculateResults(data[i]).resultSet.ImposterSyndrome.Total)
          ) {
            ImposterSyndromeValue += calculateResults(data[i]).resultSet
              .ImposterSyndrome.Total;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.ToleranceForAmbiguity.Total
            )
          ) {
            ToleranceForAmbiguityValue += calculateResults(data[i]).resultSet
              .ToleranceForAmbiguity.Total;
          }
          // Passion
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.PassionScale.HarmoniousPassion
                .Total
            )
          ) {
            HarmoniousPassionValue += calculateResults(data[i]).resultSet
              .PassionScale.HarmoniousPassion.Total;
          }
          if (
            !isNaN(
              calculateResults(data[i]).resultSet.PassionScale.ObsessivePassion
                .Total
            )
          ) {
            ObsessivePassionValue += calculateResults(data[i]).resultSet
              .PassionScale.ObsessivePassion.Total;
          }
        }
        //MotivationAtWork
        setMotivationAtWorkIntrinsic(
          (MotivationAtWorkIntrinsic / (data.length - 1)).toFixed(3)
        );
        setMotivationAtWorkIdentified(
          (MotivationAtWorkIdentified / (data.length - 1)).toFixed(3)
        );
        setMotivationAtWorkIntrojected(
          (MotivationAtWorkIntrojected / (data.length - 1)).toFixed(3)
        );
        setMotivationAtWorkExternalMotivation(
          (MotivationAtWorkExternalMotivation / (data.length - 1)).toFixed(3)
        );
        //EntrepreneurialPassion
        setEntrepreneurialPassionInventing(
          (EntrepreneurialPassionInventing / (data.length - 1)).toFixed(3)
        );
        setEntrepreneurialPassionFounding(
          (EntrepreneurialPassionFounding / (data.length - 1)).toFixed(3)
        );
        setEntrepreneurialPassionDeveloping(
          (EntrepreneurialPassionDeveloping / (data.length - 1)).toFixed(3)
        );
        //IndividualEntrepreneurialOrientation
        setIndividualEntrepreneurialOrientationRiskTaking(
          (
            IndividualEntrepreneurialOrientationRiskTaking /
            (data.length - 1)
          ).toFixed(3)
        );
        setIndividualEntrepreneurialOrientationInnovativeness(
          (
            IndividualEntrepreneurialOrientationInnovativeness /
            (data.length - 1)
          ).toFixed(3)
        );
        setIndividualEntrepreneurialOrientationProactivity(
          (
            IndividualEntrepreneurialOrientationProactivity /
            (data.length - 1)
          ).toFixed(3)
        );
        //EntrepreneurialSelfEfficacy
        setEntrepreneurialSelfEfficacySearching(
          (EntrepreneurialSelfEfficacySearching / (data.length - 1)).toFixed(3)
        );
        setEntrepreneurialSelfEfficacyPlanning(
          (EntrepreneurialSelfEfficacyPlanning / (data.length - 1)).toFixed(3)
        );
        setEntrepreneurialSelfEfficacyMarshaling(
          (EntrepreneurialSelfEfficacyMarshaling / (data.length - 1)).toFixed(3)
        );
        setEntrepreneurialSelfEfficacyImplementingPeople(
          (
            EntrepreneurialSelfEfficacyImplementingPeople /
            (data.length - 1)
          ).toFixed(3)
        );
        setEntrepreneurialSelfEfficacyImplementingFinancial(
          (
            EntrepreneurialSelfEfficacyImplementingFinancial /
            (data.length - 1)
          ).toFixed(3)
        );
        //FearOfFailure
        setFearOfFailureAbilityToFundTheVenture(
          (FearOfFailureAbilityToFundTheVenture / (data.length - 1)).toFixed(3)
        );
        setFearOfFailurePotentialOfTheIdea(
          (FearOfFailurePotentialOfTheIdea / (data.length - 1)).toFixed(3)
        );
        setFearOfFailureThreatToSocialEsteem(
          (FearOfFailureThreatToSocialEsteem / (data.length - 1)).toFixed(3)
        );
        setFearOfFailureOpportunityCosts(
          (FearOfFailureOpportunityCosts / (data.length - 1)).toFixed(3)
        );
        setFearOfFailurePersonalAbility(
          (FearOfFailurePersonalAbility / (data.length - 1)).toFixed(3)
        );
        setFearOfFailureFinancialSecurity(
          (FearOfFailureFinancialSecurity / (data.length - 1)).toFixed(3)
        );
        setFearOfFailureVenturesCapacity(
          (FearOfFailureVenturesCapacity / (data.length - 1)).toFixed(3)
        );
        //TheBigFive
        setTheBigFiveExtraversion(
          (TheBigFiveExtraversion / (data.length - 1)).toFixed(3)
        );
        setTheBigFiveAgreeableness(
          (TheBigFiveAgreeableness / (data.length - 1)).toFixed(3)
        );
        setTheBigFiveConscientiousness(
          (TheBigFiveConscientiousness / (data.length - 1)).toFixed(3)
        );
        setTheBigFiveNeuroticism(
          (TheBigFiveNeuroticism / (data.length - 1)).toFixed(3)
        );
        setTheBigFiveOpenness(
          (TheBigFiveOpenness / (data.length - 1)).toFixed(3)
        );
        // Curiosity
        setCuriosityJoyousExploration(
          (CuriosityJoyousExploration / (data.length - 1)).toFixed(3)
        );
        setCuriosityDeprivationSensitivity(
          (CuriosityDeprivationSensitivity / (data.length - 1)).toFixed(3)
        );
        setCuriosityStressTolerance(
          (CuriosityStressTolerance / (data.length - 1)).toFixed(3)
        );
        setCuriosityThrillSeeking(
          (CuriosityThrillSeeking / (data.length - 1)).toFixed(3)
        );
        setCuriosityOvertSocial(
          (CuriosityOvertSocial / (data.length - 1)).toFixed(3)
        );
        setCuriosityCovertSocial(
          (CuriosityCovertSocial / (data.length - 1)).toFixed(3)
        );

        // Well-Rounded Cognitive Function
        setGrowthOrientationValue(
          (GrowthOrientationValue / (data.length - 1)).toFixed(3)
        );
        setGrowthMindsetValue(
          (GrowthMindsetValue / (data.length - 1)).toFixed(3)
        );
        setCognitiveFlexibilityValue(
          (CognitiveFlexibilityValue / (data.length - 1)).toFixed(3)
        );
        setGritValue((GritValue / (data.length - 1)).toFixed(3));
        setResilienceValue((ResilienceValue / (data.length - 1)).toFixed(3));
        // RuleBreaking
        setRuleBreakingValue(
          (RuleBreakingValue / (data.length - 1)).toFixed(3)
        );
        // Adaptive Success
        setEmpathyValue((EmpathyValue / (data.length - 1)).toFixed(3));
        setNeedToAchieveValue(
          (NeedToAchieveValue / (data.length - 1)).toFixed(3)
        );
        setImposterSyndromeValue(
          (ImposterSyndromeValue / (data.length - 1)).toFixed(3)
        );
        setToleranceForAmbiguityValue(
          (ToleranceForAmbiguityValue / (data.length - 1)).toFixed(3)
        );
        // Passion
        setHarmoniousPassionValue(
          (HarmoniousPassionValue / (data.length - 1)).toFixed(3)
        );
        setObsessivePassionValue(
          (ObsessivePassionValue / (data.length - 1)).toFixed(3)
        );
      });
  }

  useEffect(() => {
    getall();
  }, []);

  let resultSet = props.location.state.resultSet;

  function SectionProgress(props) {
    return (
      <div>
        <Typography
          variant="h5"
          style={{
            paddingTop: '10px',
            paddingBottom: '10px',
            textAlign: 'center',
          }}
        >
          {props.name}
        </Typography>
        <Progress
          variant="determinate"
          value={props.value}
          style={{ height: '10px', maxWidth: '300px', margin: 'auto' }}
        />
      </div>
    );
  }

  // Chart.js data and options for measures below
  // See chart.js API for more modifications
  let MaWdata = {
    labels: ["Intrinsic", "Identified", "Introjected", "External Motivation"],
    datasets: [
      {
        label: "My Data",
        data: [
          (resultSet.MotivationAtWork.Intrinsic /
            ResultFeedback.MotivationAtWork.Intrinsic.scale.max) *
            100,
          (resultSet.MotivationAtWork.Identified /
            ResultFeedback.MotivationAtWork.Identified.scale.max) *
            100,
          (resultSet.MotivationAtWork.Introjected /
            ResultFeedback.MotivationAtWork.Introjected.scale.max) *
            100,
          (resultSet.MotivationAtWork.ExternalMotivation /
            ResultFeedback.MotivationAtWork.ExternalMotivation.scale.max) *
            100,
        ],
        backgroundColor: [
          "rgb(220,146,57)",
          "rgb(220,140,42)",
          "rgb(220,132,36)",
          "rgb(219,125,21)",
        ],
        borderColor: [isMobile ? "#fff" :"rgb(217, 98, 48)"],
        borderWidth: 1,
      },
      {
        label: "Average Entremap User",
        data: [
          (MotivationAtWorkIntrinsic /
            ResultFeedback.MotivationAtWork.Intrinsic.scale.max) *
            100,
          (MotivationAtWorkIdentified /
            ResultFeedback.MotivationAtWork.Identified.scale.max) *
            100,
          (MotivationAtWorkIntrojected /
            ResultFeedback.MotivationAtWork.Introjected.scale.max) *
            100,
          (MotivationAtWorkExternalMotivation /
            ResultFeedback.MotivationAtWork.ExternalMotivation.scale.max) *
            100,
        ],
        backgroundColor: ["rgba(74, 73, 72, 0.7)"],
        borderColor: [isMobile ? "#fff" : "rgb(74, 73, 72)"],
        borderWidth: 1,
        pointBackgroundColor: [isMobile ? "#fff" : "rgb(74, 73, 72)"],
      },
    ],
  };

  let MaWoptions = {
    scales: {
      xAxes: {
        grid: {
          color: isMobile ? "#D3D3D3" : "black"
        },
        ticks: isMobile
          ? {
              font: {
                size: 9,
              },
              color: "#ffffff",
            }
          : {
              font: {
                size: 9,
              },
            },
      },
      yAxes: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: isMobile ? "#D3D3D3" : "black"
        },
        ticks: isMobile
          ? {
              color: "#ffffff",
            }
          : {},
      },
    },
    plugins: {
      legend: {
        labels: isMobile ? { padding: 7, color: "#fff" } : { padding: 7 },
      },
    },
  };

  let EPdata = {
    labels: ["Inventing", "Founding", "Developing"],
    datasets: [
      {
        label: "My Data",
        data: [
          (resultSet.EntrepreneurialPassion.Inventing /
            ResultFeedback.EntrepreneurialPassion.Inventing.scale.max) *
            100,
          (resultSet.EntrepreneurialPassion.Founding /
            ResultFeedback.EntrepreneurialPassion.Founding.scale.max) *
            100,
          (resultSet.EntrepreneurialPassion.Developing /
            ResultFeedback.EntrepreneurialPassion.Developing.scale.max) *
            100,
        ],
        fill: true,
        backgroundColor: [
          isMobile ? "rgba(255, 71, 26, 0.3)" : "rgba(217, 98, 48, 0.2)",
        ],
        borderColor: ["rgb(217, 98, 48)"],
        borderWidth: 1,
        pointBackgroundColor: ["rgba(217, 98, 48,0.5)"],
      },
      {
        label: "Average Entremap User",
        data: [
          (EntrepreneurialPassionInventing /
            ResultFeedback.EntrepreneurialPassion.Inventing.scale.max) *
            100,
          (EntrepreneurialPassionFounding /
            ResultFeedback.EntrepreneurialPassion.Founding.scale.max) *
            100,
          (EntrepreneurialPassionDeveloping /
            ResultFeedback.EntrepreneurialPassion.Developing.scale.max) *
            100,
        ],
        backgroundColor: "rgba(74, 73, 72, 0.2)",
        borderColor: [isMobile ? "#fff" : "rgb(74, 73, 72)"],
        borderWidth: 1,
        pointBackgroundColor: [isMobile ? "#fff" : "rgb(74, 73, 72,0.5)"],
      },
    ],
  };

  let EPOptions = {
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 30,
      },
    },
    scale: {
      max: 100,
      min: 0,
    },

    elements: {
      line: {
        tension: 0.3,
      },
    },
    scales: {
      r: {
        pointLabels: isMobile ? { color: "#fff" } : {},
        ticks: {
          backdropColor: isMobile ? "#39AC7E" : "white",

          color: isMobile? "white" : "black"
        },
        grid: {
          circular: true,
          color: isMobile ? "#D3D3D3" : [
            "rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(219,125,21,0.7)",
          ],
        },
      },
    },
    plugins: {
      legend: {
        labels: isMobile
          ? { padding: 0, color: "#fff", font: { size: 10 }, boxWidth: 20 }
          : { padding: 4, boxWidth: 30 },
      },
    },
  };

  let IEOData = {
    labels: ["Risk Taking", "Innovativeness", "Proactivity"],
    datasets: [
      {
        label: "My Data",
        data: [
          (resultSet.IndividualEntrepreneurialOrientation.RiskTaking /
            ResultFeedback.IndividualEntrepreneurialOrientation.RiskTaking.scale
              .max) *
            100,
          (resultSet.IndividualEntrepreneurialOrientation.Innovativeness /
            ResultFeedback.IndividualEntrepreneurialOrientation.Innovativeness
              .scale.max) *
            100,
          (resultSet.IndividualEntrepreneurialOrientation.Proactivity /
            ResultFeedback.IndividualEntrepreneurialOrientation.Proactivity
              .scale.max) *
            100,
        ],
        backgroundColor: [
          isMobile ? "rgba(255, 71, 26, 0.3)" : "rgba(217, 98, 48, 0.2)",
        ],
        borderColor: ["rgb(217, 98, 48)"],
        borderWidth: 1,
        pointBackgroundColor: ["rgb(217, 98, 48,0.5)"],
      },
      {
        label: "Average Entremap User",
        data: [
          (IndividualEntrepreneurialOrientationRiskTaking /
            ResultFeedback.IndividualEntrepreneurialOrientation.RiskTaking.scale
              .max) *
            100,
          (IndividualEntrepreneurialOrientationInnovativeness /
            ResultFeedback.IndividualEntrepreneurialOrientation.Innovativeness
              .scale.max) *
            100,
          (IndividualEntrepreneurialOrientationProactivity /
            ResultFeedback.IndividualEntrepreneurialOrientation.Proactivity
              .scale.max) *
            100,
        ],
        backgroundColor: [
          isMobile ? "rgba(240,196,172, 0.4)" : "rgba(74, 73, 72, 0.2)",
        ],
        borderColor: [isMobile ? "#fff" : "rgb(74, 73, 72)"],
        borderWidth: 1,
        pointBackgroundColor: [isMobile ? "#fff" : "rgb(74, 73, 72,0.5)"],
      },
    ],
  };

  let IEOOptions = {
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 30,
      },
    },
    scale: {
      max: 100,
      min: 0,
    },

    elements: {
      line: {
        tension: 0.3,
      },
    },
    scales: {
      r: {
        pointLabels: isMobile ? { color: "#fff" } : {},
        ticks: {
          backdropColor: isMobile ? "#39AC7E" : "white",

          color: isMobile? "white" : "black"
        },
        grid: {
          circular: true,
          color: isMobile ? "#D3D3D3" : [
            "rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(219,125,21,0.7)",
          ],
        },
      },
    },
    plugins: {
      legend: {
        labels: isMobile
          ? { padding: 0, color: "#fff", font: { size: 10 }, boxWidth: 20 }
          : { padding: 4, boxWidth: 30 },
      },
    },
  };

  let ESEData = {
    labels: [
      "Searching",
      "Planning",
      "Marshaling",
      ["Implementing", "(People)"],
      ["Implementing", "(Financial)"],
    ],
    datasets: [
      {
        label: "My Data",
        data: [
          (resultSet.EntrepreneurialSelfEfficacy.Searching /
            ResultFeedback.EntrepreneurialSelfEfficacy.Searching.scale.max) *
            100,
          (resultSet.EntrepreneurialSelfEfficacy.Planning /
            ResultFeedback.EntrepreneurialSelfEfficacy.Planning.scale.max) *
            100,
          (resultSet.EntrepreneurialSelfEfficacy.Marshaling /
            ResultFeedback.EntrepreneurialSelfEfficacy.Marshaling.scale.max) *
            100,
          (resultSet.EntrepreneurialSelfEfficacy.ImplementingPeople /
            ResultFeedback.EntrepreneurialSelfEfficacy.ImplementingPeople.scale
              .max) *
            100,
          (resultSet.EntrepreneurialSelfEfficacy.ImplementingFinancial /
            ResultFeedback.EntrepreneurialSelfEfficacy.ImplementingFinancial
              .scale.max) *
            100,
        ],
        backgroundColor: [
          "rgb(227,156,68)",
          "rgb(220,146,57)",
          "rgb(220,140,42)",
          "rgb(220,132,36)",
          "rgb(219,125,21)",
        ],
        borderColor: ["rgb(217, 98, 48)"],
        borderWidth: 1,
      },
      {
        label: "Average Entremap User",
        data: [
          (EntrepreneurialSelfEfficacySearching /
            ResultFeedback.EntrepreneurialSelfEfficacy.Searching.scale.max) *
            100,
          (EntrepreneurialSelfEfficacyPlanning /
            ResultFeedback.EntrepreneurialSelfEfficacy.Planning.scale.max) *
            100,
          (EntrepreneurialSelfEfficacyMarshaling /
            ResultFeedback.EntrepreneurialSelfEfficacy.Marshaling.scale.max) *
            100,
          (EntrepreneurialSelfEfficacyImplementingPeople /
            ResultFeedback.EntrepreneurialSelfEfficacy.ImplementingPeople.scale
              .max) *
            100,
          (EntrepreneurialSelfEfficacyImplementingFinancial /
            ResultFeedback.EntrepreneurialSelfEfficacy.ImplementingFinancial
              .scale.max) *
            100,
        ],
        backgroundColor: ["rgba(74, 73, 72, 0.7)"],
        borderColor: [isMobile ? "#fff" : "rgb(74, 73, 72)"],
        borderWidth: 1,
        pointBackgroundColor: [isMobile ? "#fff" : "rgb(74, 73, 72)"],
      },
    ],
  };

  let ESEOptions = {
    scales: {
      yAxes: {
        beginAtZero: true,
        max: 100,
        ticks: isMobile
          ? {
              color: "#ffffff",
            }
          : {},
          grid: {
            color: isMobile ? "#D3D3D3" : "black"
          },
      },
      xAxes: {
        display: true,
        ticks: isMobile
          ? {
              color: "#ffffff",
              font: {
                size: 9,
              },
            }
          : {
              font: {
                size: 9,
              },
            },
            grid: {
              color: isMobile ? "#D3D3D3" : "black"
            },
      },
    },
    plugins: {
      legend: {
        labels: isMobile ? { padding: 7, color: "#fff" } : { padding: 7 },
      },
    },
  };

  let FOFData = {
    labels: [
      ["Ability", "to Fund", "the Venture"],
      ["Potential", "of the", "Idea"],
      ["Threat to", "Social", "Esteem"],
      ["Opportunity", "Costs"],
      ["Personal", "Ability"],
      ["Financial", "Security"],
      ["Venture's", "Capacity"],
    ],
    datasets: [
      {
        label: "My Data",
        data: [
          (resultSet.FearOfFailure.AbilityToFundTheVenture /
            ResultFeedback.FearOfFailure.AbilityToFundTheVenture.scale.max) *
            100,
          (resultSet.FearOfFailure.PotentialOfTheIdea /
            ResultFeedback.FearOfFailure.PotentialOfTheIdea.scale.max) *
            100,
          (resultSet.FearOfFailure.ThreatToSocialEsteem /
            ResultFeedback.FearOfFailure.ThreatToSocialEsteem.scale.max) *
            100,
          (resultSet.FearOfFailure.OpportunityCosts /
            ResultFeedback.FearOfFailure.OpportunityCosts.scale.max) *
            100,

          (resultSet.FearOfFailure.PersonalAbility /
            ResultFeedback.FearOfFailure.PersonalAbility.scale.max) *
            100,
          (resultSet.FearOfFailure.FinancialSecurity /
            ResultFeedback.FearOfFailure.FinancialSecurity.scale.max) *
            100,
          (resultSet.FearOfFailure.VenturesCapacity /
            ResultFeedback.FearOfFailure.VenturesCapacity.scale.max) *
            100,
        ],
        backgroundColor: [
          "rgb(228,166,91)",
          "rgb(227,156,77)",
          "rgb(227,156,68)",
          "rgb(220,146,57)",
          "rgb(220,140,42)",
          "rgb(220,132,36)",
          "rgb(219,125,21)",
        ],
        borderColor: isMobile ? "#fff" : ["rgb(217, 98, 48)"],
        borderWidth: 1,
      },
      {
        label: "Average Entremap User",
        data: [
          (FearOfFailureAbilityToFundTheVenture /
            ResultFeedback.FearOfFailure.AbilityToFundTheVenture.scale.max) *
            100,
          (FearOfFailurePotentialOfTheIdea /
            ResultFeedback.FearOfFailure.PotentialOfTheIdea.scale.max) *
            100,
          (FearOfFailureThreatToSocialEsteem /
            ResultFeedback.FearOfFailure.ThreatToSocialEsteem.scale.max) *
            100,
          (FearOfFailureOpportunityCosts /
            ResultFeedback.FearOfFailure.OpportunityCosts.scale.max) *
            100,

          (FearOfFailurePersonalAbility /
            ResultFeedback.FearOfFailure.PersonalAbility.scale.max) *
            100,
          (FearOfFailureFinancialSecurity /
            ResultFeedback.FearOfFailure.FinancialSecurity.scale.max) *
            100,
          (FearOfFailureVenturesCapacity /
            ResultFeedback.FearOfFailure.VenturesCapacity.scale.max) *
            100,
        ],
        backgroundColor: ["rgba(74, 73, 72, 0.7)"],
        borderColor: [isMobile ? "#fff" : "rgb(74, 73, 72)"],
        borderWidth: 1,
        pointBackgroundColor: [isMobile ? "#fff" : "rgb(74, 73, 72)"],
      },
    ],
  };

  let FOFOptions = {
    scales: {
      yAxes: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: isMobile ? "#D3D3D3" : "black"
        },
        ticks: isMobile
          ? {
              color: "#ffffff",
            }
          : {},
      },
      xAxes: {
        display: true,
        grid: {
          color: isMobile ? "#D3D3D3" : "black"
        },
        ticks: isMobile
          ? {
              color: "#ffffff",
              font: {
                size: 8,
              },
            }
          : {
              font: {
                size: 8,
              },
            },
      },
    },
    plugins: {
      legend: {
        labels: isMobile ? { padding: 7, color: "#fff" } : { padding: 7 },
      },
    },
  };

  let TBFdata = {
    labels: [
      "Extraversion",
      "Agreeableness",
      "Conscientiousness",
      "Neuroticism",
      "Openness",
    ],
    datasets: [
      {
        label: "My Data",
        data: [
          (resultSet.TheBigFive.Extraversion /
            ResultFeedback.TheBigFive.Extraversion.scale.max) *
            100,
          (resultSet.TheBigFive.Agreeableness /
            ResultFeedback.TheBigFive.Agreeableness.scale.max) *
            100,
          (resultSet.TheBigFive.Conscientiousness /
            ResultFeedback.TheBigFive.Conscientiousness.scale.max) *
            100,
          (resultSet.TheBigFive.Neuroticism /
            ResultFeedback.TheBigFive.Neuroticism.scale.max) *
            100,
          (resultSet.TheBigFive.Openness /
            ResultFeedback.TheBigFive.Openness.scale.max) *
            100,
        ],
        backgroundColor: [
          isMobile ? "rgba(255, 71, 26, 0.3)" : "rgb(217, 98, 48 ,0.2)",
        ],
        borderColor: ["rgb(217, 98, 48)"],
        borderWidth: 1,
        pointBackgroundColor: ["rgb(217, 98, 48,0.5)"],
      },
      {
        label: "Average Entremap User",
        data: [
          (TheBigFiveExtraversion /
            ResultFeedback.TheBigFive.Extraversion.scale.max) *
            100,
          (TheBigFiveAgreeableness /
            ResultFeedback.TheBigFive.Agreeableness.scale.max) *
            100,
          (TheBigFiveConscientiousness /
            ResultFeedback.TheBigFive.Conscientiousness.scale.max) *
            100,
          (TheBigFiveNeuroticism /
            ResultFeedback.TheBigFive.Neuroticism.scale.max) *
            100,
          (TheBigFiveOpenness / ResultFeedback.TheBigFive.Openness.scale.max) *
            100,
        ],
        backgroundColor: [
          isMobile ? "rgba(240,196,172, 0.4)" : "rgba(74, 73, 72, 0.2)",
        ],
        borderColor: [isMobile ? "#fff" : "rgb(74, 73, 72)"],
        borderWidth: 1,
        pointBackgroundColor: [isMobile ? "#fff" : "rgb(74, 73, 72,0.5)"],
      },
    ],
  };

  let TBFOptions = {
    scale: {
      max: 100,
      min: 0,
    },
    elements: {
      line: {
        tension: 0.2,
      },
    },
    scales: {
      r: {
        pointLabels: isMobile ? { color: "#fff" } : {},
        ticks: {
          backdropColor: isMobile ? "#39AC7E" : "white",

          color: isMobile ? "white" : "black",
        },
        grid: {
          circular: true,
          color: isMobile ? "#D3D3D3" : [
            "rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(219,125,21,0.7)",
          ],
        },
      },
    },
    plugins: {
      legend: {
        labels: isMobile ? { padding: 7, color: "#fff" } : { padding: 7 },
      },
    },
  };

  let CUdata = {
    labels: [
      "Joyous Exploration",
      "Deprivation Sensitivity",
      "Stress Tolerance",
      "Thrill Seeking",
      "Overt Social",
      "Covert Social",
    ],
    datasets: [
      {
        label: "My Data",
        data: [
          (resultSet.Curiosity.JoyousExploration /
            ResultFeedback.Curiosity.JoyousExploration.scale.max) *
            100,
          (resultSet.Curiosity.DeprivationSensitivity /
            ResultFeedback.Curiosity.DeprivationSensitivity.scale.max) *
            100,
          (resultSet.Curiosity.StressTolerance /
            ResultFeedback.Curiosity.StressTolerance.scale.max) *
            100,
          (resultSet.Curiosity.ThrillSeeking /
            ResultFeedback.Curiosity.ThrillSeeking.scale.max) *
            100,
          (resultSet.Curiosity.OvertSocial /
            ResultFeedback.Curiosity.OvertSocial.scale.max) *
            100,
          (resultSet.Curiosity.CovertSocial /
            ResultFeedback.Curiosity.CovertSocial.scale.max) *
            100,
        ],
        backgroundColor: [
          isMobile ? "rgba(255, 71, 26, 0.3)" : "rgb(217, 98, 48 ,0.2)",
        ],
        borderColor: ["rgb(217, 98, 48)"],
        borderWidth: 1,
        pointBackgroundColor: ["rgb(217, 98, 48,0.5)"],
      },
      {
        label: "Average Entremap User",
        data: [
          (CuriosityJoyousExploration /
            ResultFeedback.Curiosity.JoyousExploration.scale.max) *
            100,
          (CuriosityDeprivationSensitivity /
            ResultFeedback.Curiosity.DeprivationSensitivity.scale.max) *
            100,
          (CuriosityStressTolerance /
            ResultFeedback.Curiosity.StressTolerance.scale.max) *
            100,
          (CuriosityThrillSeeking /
            ResultFeedback.Curiosity.ThrillSeeking.scale.max) *
            100,
          (CuriosityOvertSocial /
            ResultFeedback.Curiosity.OvertSocial.scale.max) *
            100,
          (CuriosityCovertSocial /
            ResultFeedback.Curiosity.CovertSocial.scale.max) *
            100,
        ],
        backgroundColor: [
          isMobile ? "rgba(240,196,172, 0.4)" : "rgba(74, 73, 72, 0.2)",
        ],
        borderColor: [isMobile ? "#fff" : "rgb(74, 73, 72)"],
        borderWidth: 1,
        pointBackgroundColor: [isMobile ? "#fff" : "rgb(74, 73, 72,0.5)"],
      },
    ],
  };

  let CUOptions = {
    scale: {
      max: 100,
      min: 0,
    },
    elements: {
      line: {
        tension: 0.2,
      },
    },
    scales: {
      r: {
        pointLabels: isMobile ? { color: "#fff" } : {},
        ticks: {
          backdropColor: isMobile ? "#39AC7E" : "white",

          color: isMobile ? "white" : "black",
        },
        grid: {
          circular: true,
          color: isMobile ? "#D3D3D3" :
            ["rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(74, 73, 72,0.2)",
            "rgb(219,125,21,0.7)"
          ],
        },
      },
    },
    plugins: {
      legend: {
        labels: isMobile ? { padding: 3, color: "#fff" } : { padding: 3},
      },
    },
  };

  let growthData = {
    labels: [
      "Growth Orientation",
      "Growth Mindset",
      "Cognitive Flexibility",
      "Grit",
      "Resilience",
    ],

    datasets: [
      {
        label: "My Data",

        data: [
          (resultSet.GrowthOrientation.Total /
            ResultFeedback.GrowthOrientation.Total.scale.max) *
            100,

          (resultSet.GrowthMindset.Total /
            ResultFeedback.GrowthMindset.Total.scale.max) *
            100,

          (resultSet.CognitiveFlexibility.Total /
            ResultFeedback.CognitiveFlexibility.Total.scale.max) *
            100,

          (resultSet.Grit.Total / ResultFeedback.Grit.Total.scale.max) * 100,

          (resultSet.Resilience.Total /
            ResultFeedback.Resilience.Total.scale.max) *
            100,
        ],

        backgroundColor: [isMobile ? "rgb(220,132,36)" : "rgb(220,132,36)"],

        borderColor: [isMobile ? "#fff" :"rgb(217, 98, 48)"],

        borderWidth: 1,

      },
      {
        label: "Average Entremap User",
        data: [
          (GrowthOrientationValue /
            ResultFeedback.GrowthOrientation.Total.scale.max) *
            100,
          (GrowthMindsetValue / ResultFeedback.GrowthMindset.Total.scale.max) *
            100,
          (CognitiveFlexibilityValue /
            ResultFeedback.CognitiveFlexibility.Total.scale.max) *
            100,
          (GritValue / ResultFeedback.Grit.Total.scale.max) * 100,
          (ResilienceValue / ResultFeedback.Resilience.Total.scale.max) * 100,
        ],
        backgroundColor: [
          isMobile ? "rgba(74, 73, 72, 0.7)" : "rgba(74, 73, 72, 0.7)",
        ],
        borderColor: [isMobile ? "#fff" : "rgb(74, 73, 72)"],
        borderWidth: 1,
      },
    ],
  };

  let growthOptions = {
    indexAxis: "y",
    plugins: {
      legend: {
        labels: isMobile
          ? { padding: 3, color: "#fff"}
          : { padding: 4},
      },
    },
    scales: {
      x: {
        grid: {
          color: isMobile ? "#D3D3D3" : "black"
        },
        ticks: {
          color: isMobile ? "white" : "black"
        }
      },
      y: {
        grid: {
          color: isMobile ? "#D3D3D3" : "black"
        
        },
        ticks: {
          color: isMobile ? "white" : "black"
        }
      }
    },
    scale: {
      max: 100,

      min: 0,
      

      elements: {
        bar: {
          borderWidth: 2,
        },
      },
    },
    
      responsive: true,
    
  };

  let growth2Data = {
    labels: [
      "Rule-Breaking",
      "Empathy",
      "Need to Achieve",
      "Imposter Syndrome",
      "Tolerance for Ambiguity",
    ],

    datasets: [
      {
        label: "My Data",

        data: [
          (resultSet.RuleBreaking.Total / // change to rulebreaking.Total
            ResultFeedback.RuleBreaking.Total.scale.max) *
            100,

          (resultSet.Empathy.Total / ResultFeedback.Empathy.Total.scale.max) *
            100,

          (resultSet.NeedToAchieve.Total /
            ResultFeedback.NeedToAchieve.Total.scale.max) *
            100,

          (resultSet.ImposterSyndrome.Total /
            ResultFeedback.ImposterSyndrome.Total.scale.max) *
            100,

          (resultSet.ToleranceForAmbiguity.Total /
            ResultFeedback.ToleranceForAmbiguity.Total.scale.max) *
            100,
        ],

        backgroundColor: [isMobile ? "rgb(220,132,36)" : "rgb(220,132,36)"],

        borderColor: ["rgb(217, 98, 48)"],

        borderWidth: 1,

      },
      {
        label: "Average Entremap User",
        data: [
          (RuleBreakingValue / ResultFeedback.RuleBreaking.Total.scale.max) *
            100,
          (EmpathyValue / ResultFeedback.Empathy.Total.scale.max) * 100,
          (NeedToAchieveValue / ResultFeedback.NeedToAchieve.Total.scale.max) *
            100,
          (ImposterSyndromeValue /
            ResultFeedback.ImposterSyndrome.Total.scale.max) *
            100,
          (ToleranceForAmbiguityValue /
            ResultFeedback.ToleranceForAmbiguity.Total.scale.max) *
            100,
        ],
        backgroundColor: [
          isMobile ? "rgba(74, 73, 72, 0.7)" : "rgba(74, 73, 72, 0.7)",
        ],
        borderColor: [isMobile ? "#fff" : "rgb(74, 73, 72)"],
        borderWidth: 1,
        //pointBackgroundColor: [isMobile ? '#fff' : 'rgb(74, 73, 72,0.5)'],
      },
    ],
  };

  let growth2Options = {
    indexAxis: "y",
    plugins: {
      legend: {
        labels: isMobile
          ? { padding: 3, color: "#fff"}
          : { padding: 4},
      },
    },
    scales: {
      x: {
        grid: {
          color: isMobile ? "#D3D3D3" : "black"
        },
        ticks: {
          color: isMobile ? "white" : "black"
        }
      },
      y: {
        grid: {
          color: isMobile ? "#D3D3D3" : "black"
        
        },
        ticks: {
          color: isMobile ? "white" : "black"
        }
      }
    },
    scale: {
      max: 100,

      min: 0,
      

      elements: {
        bar: {
          borderWidth: 2,
        },
      },
    },
    
      responsive: true,
    
  };

    // Create and Export PDF Document


    // elements var to hold ref content
    var elements = document.getElementById("REF");
    // console.log(elements);

    const getDocument = () => {
      // TARGETS SECTION WITH REF as ID in return code
      const input = document.getElementById("REF")
      html2canvas(input, {logging: true, letterRendering: 1, useCORS: true}).then(canvas=>{
          const imgWidth = 180;
      	  const pageHeight = 297;
          const selectorRef = 0;
          const increment = -297;
          const imgHeight = canvas.height * imgWidth / canvas.width;
          let totalPages=canvas.height/842;
          let heightremaining = imgHeight;
          let position = 0;
          heightremaining -= pageHeight;
          const imgData = canvas.toDataURL('img/png');
          const document = new jsPDF('p', 'mm','a4');
          // INITIAL PAGE //
          document.setFillColor("#39AC7E");
          document.rect(0,0,230,297, "F");
          document.setFillColor("white");
          document.roundedRect(5,5,200,280,5,5,"F");
          // Document Footer
          document.setFillColor("#d96230");
          document.rect(0,282,230,15, "F");
          document.setTextColor("white");
          document.setFontSize(11);
          document.text("© Copyright 2023 - Entremap - All rights reserved.", 5, 291);
          document.text("Contact: entremapco@gmail.com",147,291);
          // Add image to doc
          document.addImage(imgData, 'PNG', 15, 15, imgWidth, imgHeight);
          while (heightremaining >= 0) {
            position = heightremaining - imgHeight;
            document.addPage();
            document.setFillColor("#39AC7E");
            document.rect(0,0,230,297, "F");
            document.setFillColor("white");
            document.roundedRect(5,5,200,280,5,5,"F");
            // Document Footer
            document.setFillColor("#d96230");
            document.rect(0,282,230,15, "F");
            document.setTextColor("white");
            document.setFontSize(11);
            document.text("© Copyright 2023 - Entremap - All rights reserved.", 5, 291);
            document.text("Contact: entremapco@gmail.com",147,291);
            document.addImage(canvas, 'PNG', 15, position, imgWidth, imgHeight, '', 'FAST');
            heightremaining -= pageHeight;
          }
          const element2 = (Document.getElementById("REF2"));

          // Process document
          document.save("YourMindsetReport.PDF");
        })
    }

  return (
    <div
      style={{
        backgroundColor: '#39AC7E',
        pageBreakAfter: 'always',
      }}
    >
      <NavBar isLoggedIn={true} />
      <div
        style={{
          margin: 'auto',
          width: '100%',
          paddingTop: '30px',
          paddingBottom: '50px',
        }}
      >
        <Box
          boxShadow={1}
          color="text.primary"
          id={'Result'}
          style={{
            margin: 'auto',
            width: isMobile ? '100vw' : '794px',
            backgroundColor: isMobile ? 'transparent' : 'white',
            padding: isMobile ? '0 12px' : '2vw',
            marginBottom: '10px',
            boxSizing: isMobile ? 'border-box' : 'unset',
            boxShadow: isMobile ? 'none' : undefined,
          }}
        >
          <ReactToPrint
            trigger={() => (
              <Button
                variant="contained"
                size={isMobile ? 'small' : 'large'}
                color="primary"
                style={{ marginRight: isMobile ? '4px' : '50px' }}
              >
                Print
              </Button>
            )}
            pageStyle="@media all {
                            .page-break {
                              display: none;
                            }
                          }
                          @media print {
                            html, body {
                              height: initial !important;
                              overflow: initial !important;
                              -webkit-print-color-adjust: exact;
                            }
                          }
                          @media print {
                            .page-break {
                              margin-top: 1rem;
                              display: block;
                              page-break-before: auto;
                            }
                          }
                          @page {
                            size: auto;
                            margin: 10mm;
                          }"
            content={() => componentRef.current}
          />
          <Button
            variant="contained"
            size={isMobile ? 'small' : 'large'}
            color="primary"
            component={Link}
            to={{ pathname: '/results', state: props.location.state }}
          >
            Overview
          </Button>
          {/* GET PDF FUNCTION */}
          <Button
            variant="contained"
            size={isMobile ? 'small' : 'large'}
            color="primary"
            style={{ marginRight: isMobile ? '4px' : '50px' }}
            onClick={()=>getDocument()}
          >
            Export PDF
          </Button>
        </Box>
        <Box
          boxShadow={1}
          color="text.primary"
          id={'Result'}
          style={{
            margin: 'auto',
            width: isMobile ? '100vw' : '794px',
            minHeight: '1123px',
            backgroundColor: isMobile ? 'transparent' : 'white',
            padding: isMobile ? '0 12px' : '2vw',
            boxSizing: isMobile ? 'border-box' : 'unset',
            color: isMobile ? '#fff' : '#000',
          }}
        >
          <div
            id='REF'
            ref={componentRef}
            style={{
              width: isMobile ? '100%' : '790px',
              minHeight: '1120px',
            }}
          >
            <Typography
              variant="h5"
              align="center"
              color= {isMobile ? "white" : "primary"}
              padding="30px"
            >
              Entremap Mindset Report
            </Typography>
            <div style={{ height: 6, width: "100%", opacity: 0 }} />
            <div style={{ height: 6, width: "100%", opacity: 0 }} />
            <div style={{ height: 6, width: "100%", opacity: 0 }} />
            <div
              style={{
                height: 2,
                width: "100%",
                backgroundColor: "#39AC7E",
                opacity: 0.7,
              }}
            />
            <Divider></Divider>
            <div style={{ height: 12, width: "100%" }} />
            <div style={{ height: 15, width: "100%", opacity: 0 }} />
            <Typography
              variant="body1"
              align="left"
              padding="30px"
              color= {isMobile ? "white" : "primary"}
            >
              The Entremap Mindset Report allows you to have a deeper look into
              your entrepreneurial mindset, backed by extensive research. You
              can compare your scores to the average user. Knowing your
              strengths and weaknesses can help you grow as an entrepreneur and
              make better decisions. You can also retake this survey to track
              and compare your growth as an entrepreneur over time.
            </Typography>
            <div>
              <Typography
                variant="h5"
                align="center"
                color= {isMobile ? "white" : "primary"}
                style={{ paddingTop: "30px", paddingBottom: "15px" }}
              >
                Motivation at Work
              </Typography>
              <Grid
                container
                p={28}
                spacing={2}
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Bar options={MaWoptions} data={MaWdata} height ={250} width={560} style={{ margin: "auto" }}/>
              </Grid>
              <Grid container spacing={5}>
                <Grid item xs="12" sm="12" style={{ paddingTop: "30px" }}>
                  <Typography gutterBottom>
                    {getResponse(
                      "MotivationAtWork.Intrinsic",
                      resultSet.MotivationAtWork.Intrinsic
                    )}
                  </Typography>
                  <Typography gutterBottom>
                    {getResponse(
                      "MotivationAtWork.Identified",
                      resultSet.MotivationAtWork.Identified
                    )}
                  </Typography>
                  <Typography gutterBottom>
                    {getResponse(
                      "MotivationAtWork.Introjected",
                      resultSet.MotivationAtWork.Introjected
                    )}
                  </Typography>

                  <Typography gutterBottom>
                    {getResponse(
                      "MotivationAtWork.ExternalMotivation",
                      resultSet.MotivationAtWork.ExternalMotivation
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <Typography
              variant="h5"
              align="center"
              color= {isMobile ? "white" : "primary"}
              style={{ paddingTop: "30px", paddingBottom: "15px" }}
            >
              Entrepreneurial Passion
            </Typography>
            <Grid
              container
              p={28}
              spacing={2}
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Radar options={EPOptions} data={EPdata} height={400} style={{ margin: "auto" }}/>
            </Grid>
            <Grid container spacing={5}>
            <Grid item xs="12" sm="12" style={{ paddingTop: "30px" }}>
              <Typography gutterBottom style={{ paddingTop: "30px" }}>
                {getResponse(
                  "EntrepreneurialPassion.Total",
                  resultSet.EntrepreneurialPassion.Total
                )}
              </Typography>
            </Grid>
            </Grid>
            <div>
              <Typography
                variant="h5"
                align="center"
                color= {isMobile ? "white" : "primary"}
                style={{ paddingTop: "30px", paddingBottom: "15px" }}
              >
                Passion Scale
              </Typography>

              <Grid container spacing={5}>
                <Grid item xs="12" sm="6">
                  <Typography
                    variant="h6"
                    style={{ textAlign: "center" }}
                    gutterBottom
                  >
                    Harmonious Passion
                  </Typography>
                  <Progress
                    variant="determinate"
                    value={
                      (resultSet.PassionScale.HarmoniousPassion /
                        ResultFeedback.PassionScale.HarmoniousPassion.scale
                          .max) *
                      100
                    }
                    style={{
                      height: "10px",
                      maxWidth: "300px",
                      margin: "auto",
                    }}
                  />
                </Grid>
                
                <Grid item xs="12" sm="6">
                  <Typography variant="h6" style={{ textAlign: "center" }}>
                    Obsessive Passion
                  </Typography>
                  <Progress
                    variant="determinate"
                    value={
                      (resultSet.PassionScale.ObsessivePassion /
                        ResultFeedback.PassionScale.ObsessivePassion.scale
                          .max) *
                      100
                    }
                    style={{
                      height: "10px",
                      maxWidth: "300px",
                      margin: "auto",
                    }}
                  />
                </Grid>
              </Grid>
            </div>
            <Grid container spacing={5} style={{ paddingTop: "30px" }}>
                <Grid item xs="12" sm="12">
                  <Typography gutterBottom> 
                  {getResponse(
                      "PassionScale.HarmoniousPassion.Total",
                      resultSet.PassionScale.HarmoniousPassion.Total
                    )}
                  {getResponse(
                      "PassionScale.ObsessivePassion.Total",
                      resultSet.PassionScale.ObsessivePassion.Total
                    )}
                  </Typography>
                </Grid>
              </Grid>
            <div>
              {" "}
              <Typography
                variant="h5"
                align="center"
                color= {isMobile ? "white" : "primary"}
                style={{ paddingTop: "30px", paddingBottom: "15px" }}
              >
                Individual Entrepreneurial Orientation
              </Typography>
              <div style={{ maxWidth: "1000px", maxHeight: "1000px" }}>
                <Radar
                  data={IEOData}
                  height={400}
                  options={IEOOptions}
                  style={{ margin: "auto" }}
                />
              </div>
              <Grid container spacing={5} style={{ paddingTop: "30px" }}>
                <Grid item xs="12" sm="12">
                  <Typography gutterBottom>
                    {getResponse(
                      "IndividualEntrepreneurialOrientation.RiskTaking",
                      resultSet.IndividualEntrepreneurialOrientation.RiskTaking
                    )}
                  </Typography>
                  <Typography gutterBottom>
                    {getResponse(
                      "IndividualEntrepreneurialOrientation.Innovativeness",
                      resultSet.IndividualEntrepreneurialOrientation
                        .Innovativeness
                    )}
                  </Typography>
                  <Typography gutterBottom>
                    {getResponse(
                      "IndividualEntrepreneurialOrientation.Proactivity",
                      resultSet.IndividualEntrepreneurialOrientation.Proactivity
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <div>
              <Typography
                variant="h5"
                align="center"
                color= {isMobile ? "white" : "primary"}
                style={{ paddingTop: "30px", paddingBottom: "15px" }}
              >
                Entrepreneurial Self Efficacy
              </Typography>
              <Bar options={ESEOptions} data={ESEData} height ={isMobile ? 250 : 300} width={isMobile ? 350 : 700} style={{ margin: "auto" }}/>
              <Typography
                gutterBottom
                style={{ paddingTop: "30px", paddingBottom: "30px" }}
              >
                {getResponse(
                  "EntrepreneurialSelfEfficacy.Total",
                  resultSet.EntrepreneurialSelfEfficacy.Total
                )}
              </Typography>
            </div>

            <div>
              <Typography
                variant="h5"
                align="center"
                color= {isMobile ? "white" : "primary"}
                style={{ paddingTop: "30px", paddingBottom: "15px" }}
              >
                Well-Rounded Cognitive Function
              </Typography>
              <Bar data={growthData} options={growthOptions} height ={isMobile ? 250: 300} width={isMobile ? 350 : 700} style={{ margin: "auto" }}/>
            </div>

            <div>
              <Typography
                variant="h5"
                align="center"
                color= {isMobile ? "white" : "primary"}
                style={{ paddingTop: "30px", paddingBottom: "15px" }}
              >
                Adaptive Success
              </Typography>
              <Bar data={growth2Data} options={growth2Options} height ={isMobile? 250:300} width={isMobile?350:700} style={{ margin: "auto" }}/>
            </div>
            <div></div>

            <Grid container spacing={3}>
              <Grid item xs="12" sm="4">
                <SectionProgress
                  name="Cognitive Flexibility"
                  value={
                    (resultSet.CognitiveFlexibility.Total /
                      ResultFeedback.CognitiveFlexibility.Total.scale.max) *
                    100
                  }
                />
              </Grid>
              <Grid item xs="12" sm="8">
                <Typography gutterBottom style={{ paddingTop: "30px" }}>
                  {getResponse(
                    "CognitiveFlexibility.Total",
                    resultSet.CognitiveFlexibility.Total
                  )}
                </Typography>
              </Grid>
              <Grid item xs="12" sm="4">
                <SectionProgress
                  name="Empathy"
                  value={
                    (resultSet.Empathy.Total /
                      ResultFeedback.Empathy.Total.scale.max) *
                    100
                  }
                />
              </Grid>
              <Grid item xs="12" sm="8">
                <Typography gutterBottom style={{ paddingTop: "30px" }}>
                  {getResponse("Empathy.Total", resultSet.Empathy.Total)}
                </Typography>
              </Grid>
              <Grid item xs="12" sm="4">
                <SectionProgress
                  name="Need to Achieve"
                  value={
                    (resultSet.NeedToAchieve.Total /
                      ResultFeedback.NeedToAchieve.Total.scale.max) *
                    100
                  }
                />
              </Grid>
              <Grid item xs="12" sm="8">
                <Typography gutterBottom style={{ paddingTop: "30px" }}>
                  {getResponse(
                    "NeedToAchieve.Total",
                    resultSet.NeedToAchieve.Total
                  )}
                </Typography>
              </Grid>
              <Grid item xs="12" sm="4">
                <SectionProgress
                  name="Grit"
                  value={
                    (resultSet.Grit.Total /
                      ResultFeedback.Grit.Total.scale.max) *
                    100
                  }
                />
              </Grid>
              <Grid item xs="12" sm="8">
                <Typography style={{ paddingTop: "30px" }}>
                  {getResponse("Grit.Total", resultSet.Grit.Total)}
                </Typography>
              </Grid>
              <Grid item xs="12" sm="4">
                <SectionProgress
                  name="Growth Orientation"
                  value={
                    (resultSet.GrowthOrientation.Total /
                      ResultFeedback.GrowthOrientation.Total.scale.max) *
                    100
                  }
                />
              </Grid>
              <Grid item xs="12" sm="8">
                <Typography style={{ paddingTop: "30px" }}>
                  {getResponse(
                    "GrowthOrientation.Total",
                    resultSet.GrowthOrientation.Total
                  )}
                </Typography>
              </Grid>
              <Grid item xs="12" sm="4">
                <SectionProgress
                  name="Tolerance for Ambiguity"
                  value={
                    (resultSet.ToleranceForAmbiguity.Total /
                      ResultFeedback.ToleranceForAmbiguity.Total.scale.max) *
                    100
                  }
                />
              </Grid>
              <Grid item xs="12" sm="8">
                <Typography style={{ paddingTop: "30px" }}>
                  {getResponse(
                    "ToleranceForAmbiguity.Total",
                    resultSet.ToleranceForAmbiguity.Total
                  )}
                </Typography>
              </Grid>
              <Grid item xs="12" sm="4">
                <SectionProgress
                  name="Resilience"
                  value={
                    (resultSet.Resilience.Total /
                      ResultFeedback.Resilience.Total.scale.max) *
                    100
                  }
                />
              </Grid>
              <Grid item xs="12" sm="8">
                <Typography style={{ paddingTop: "30px" }}>
                  {getResponse("Resilience.Total", resultSet.Resilience.Total)}
                </Typography>
              </Grid>
              <Grid item xs="12" sm="4">
                <SectionProgress
                  name="Growth Mindset"
                  value={
                    (resultSet.GrowthMindset.Total /
                      ResultFeedback.GrowthMindset.Total.scale.max) *
                    100
                  }
                />
              </Grid>
              <Grid item xs="12" sm="8">
                <Typography style={{ paddingTop: "30px" }}>
                  {getResponse(
                    "GrowthMindset.Total",
                    resultSet.GrowthMindset.Total
                  )}
                </Typography>
              </Grid>
              <Grid item xs="12" sm="4">
                <SectionProgress
                  name="Rule-Breaking"
                  value={
                    (resultSet.RuleBreaking.Total /
                      ResultFeedback.RuleBreaking.Total.scale.max) *
                    100
                  }
                />
              </Grid>
              <Grid item xs="12" sm="8">
                <Typography style={{ paddingTop: "30px" }}>
                  {getResponse(
                    "RuleBreaking.Total",
                    resultSet.RuleBreaking.Total
                  )}
                </Typography>
              </Grid>
              <Grid item xs="12" sm="4">
                <SectionProgress
                  name="Imposter Syndrome"
                  value={
                    (resultSet.ImposterSyndrome.Total /
                      ResultFeedback.ImposterSyndrome.Total.scale.max) *
                    100
                  }
                />
              </Grid>
              <Grid item xs="12" sm="8">
                <Typography style={{ paddingTop: "30px" }}>
                  {getResponse(
                    "ImposterSyndrome.Total",
                    resultSet.ImposterSyndrome.Total
                  )}
                </Typography>
              </Grid>
              
            </Grid>

            <div>
              <Typography
                variant="h5"
                align="center"
                color= {isMobile ? "white" : "primary"}
                style={{ paddingTop: "30px", paddingBottom: "15px" }}
              >
                Fear of Failure
              </Typography>
              <Bar options={FOFOptions} data={FOFData} />
            </div>
            <Grid container spacing={5} style={{ paddingTop: "30px" }}>
                <Grid item xs="12" sm="12">
                  <Typography gutterBottom>
                    {getResponse( 
                      "FearOfFailure.Total",
                      resultSet.FearOfFailure.Total
                    )}
                   
                  </Typography>
                </Grid>
              </Grid>

              <Typography
                variant="h5"
                align="center"
                color= {isMobile ? "white" : "primary"}
                style={{ paddingTop: "30px", paddingBottom: "15px" }}
              >
                Curiosity
              </Typography>
              <div style={{ maxWidth: "1000px", maxHeight: "1000px" }}>
                <Radar
                  data={CUdata}
                  options={CUOptions}
                />
              </div>
              <Grid container spacing={5} style={{ paddingTop: "30px" }}>
                <Grid item xs="12" sm="12">
                  <Typography gutterBottom>
                    {getResponse(
                      "Curiosity.Total",
                      resultSet.Curiosity.Total
                    )}
                  </Typography>
                  </Grid>
                  </Grid>           
            <div id="REF2">
              <Typography
                variant="h5"
                align="center"
                color= {isMobile ? "white" : "primary"}
                style={{ paddingTop: "30px", paddingBottom: "15px" }}
              >
                The Big Five
              </Typography>
              <Radar data={TBFdata} options={TBFOptions}> style={{ margin: "auto" }}</Radar>
            </div>
            <Grid container spacing={5} style={{ paddingTop: "30px" }}>
                <Grid item xs="12" sm="12">
                  <Typography gutterBottom>
                    {getResponse( 
                      "TheBigFive.Total",
                      resultSet.TheBigFive.Total
                    )}
                   
                  </Typography>
                </Grid>
              </Grid>
          </div>
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export default ResultExtended;
