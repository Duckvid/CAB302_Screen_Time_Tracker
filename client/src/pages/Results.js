import React, { useState, useRef, useEffect, useContext } from "react";
import { Box } from "@material-ui/core";
import NavBar from "../components/NavBar";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import { getResponse } from "../utils/getResponse";
import Grid from "@material-ui/core/Grid";
import Progress from "@material-ui/core/LinearProgress";
import { format } from "date-fns";
import ResultFeedback from "../components/resultFeedback.json";
import { Bar, Radar } from "react-chartjs-2";
import Footer from "../components/Footer";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import ReactToPrint from "react-to-print";
import { Link, useHistory } from "react-router-dom";
import calculateResults from "../utils/calculated";
import { isMobile } from "../utils/util";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import AppContext from "../AppContext";
//import StripeModal from '../components/StripeModal';

function Results(props) {
  const [open, setOpen] = useState(false);
  const { requestIsProUser } = useContext(AppContext);
  const [loading, setLoading ] = useState(false);
  const history = useHistory();

  // Set constants to change the state of these measures
  //store data of MotivationAtWork
  const [MotivationAtWorkIntrinsic, setMotivationAtWorkIntrinsic] = useState(0);
  const [MotivationAtWorkIdentified, setMotivationAtWorkIdentified] =
    useState(0);
  const [MotivationAtWorkIntrojected, setMotivationAtWorkIntrojected] =
    useState(0);
  const [
    MotivationAtWorkExternalMotivation,
    setMotivationAtWorkExternalMotivation,
  ] = useState(0);
  //store data of EntrepreneurialPassion
  const [EntrepreneurialPassionInventing, setEntrepreneurialPassionInventing] =
    useState(0);
  const [EntrepreneurialPassionFounding, setEntrepreneurialPassionFounding] =
    useState(0);
  const [
    EntrepreneurialPassionDeveloping,
    setEntrepreneurialPassionDeveloping,
  ] = useState(0);
  //store data of IndividualEntrepreneurialOrientation
  const [
    IndividualEntrepreneurialOrientationRiskTaking,
    setIndividualEntrepreneurialOrientationRiskTaking,
  ] = useState(0);
  const [
    IndividualEntrepreneurialOrientationInnovativeness,
    setIndividualEntrepreneurialOrientationInnovativeness,
  ] = useState(0);
  const [
    IndividualEntrepreneurialOrientationProactivity,
    setIndividualEntrepreneurialOrientationProactivity,
  ] = useState(0);
  // //store data of EntrepreneurialSelfEfficacy
  const [
    EntrepreneurialSelfEfficacySearching,
    setEntrepreneurialSelfEfficacySearching,
  ] = useState(0);
  const [
    EntrepreneurialSelfEfficacyPlanning,
    setEntrepreneurialSelfEfficacyPlanning,
  ] = useState(0);
  const [
    EntrepreneurialSelfEfficacyMarshaling,
    setEntrepreneurialSelfEfficacyMarshaling,
  ] = useState(0);
  const [
    EntrepreneurialSelfEfficacyImplementingPeople,
    setEntrepreneurialSelfEfficacyImplementingPeople,
  ] = useState(0);
  const [
    EntrepreneurialSelfEfficacyImplementingFinancial,
    setEntrepreneurialSelfEfficacyImplementingFinancial,
  ] = useState(0);
  // //store data of FearOfFailure
  const [
    FearOfFailureAbilityToFundTheVenture,
    setFearOfFailureAbilityToFundTheVenture,
  ] = useState(0);
  const [FearOfFailurePotentialOfTheIdea, setFearOfFailurePotentialOfTheIdea] =
    useState(0);
  const [
    FearOfFailureThreatToSocialEsteem,
    setFearOfFailureThreatToSocialEsteem,
  ] = useState(0);
  const [FearOfFailureOpportunityCosts, setFearOfFailureOpportunityCosts] =
    useState(0);
  const [FearOfFailurePersonalAbility, setFearOfFailurePersonalAbility] =
    useState(0);
  const [FearOfFailureFinancialSecurity, setFearOfFailureFinancialSecurity] =
    useState(0);
  const [FearOfFailureVenturesCapacity, setFearOfFailureVenturesCapacity] =
    useState(0);
  // //store data of TheBigFive
  const [TheBigFiveExtraversion, setTheBigFiveExtraversion] = useState(0);
  const [TheBigFiveAgreeableness, setTheBigFiveAgreeableness] = useState(0);
  const [TheBigFiveConscientiousness, setTheBigFiveConscientiousness] =
    useState(0);
  const [TheBigFiveNeuroticism, setTheBigFiveNeuroticism] = useState(0);
  const [TheBigFiveOpenness, setTheBigFiveOpenness] = useState(0);
  // Growth Orientation
  const [GrowthOrientationValue, setGrowthOrientationValue] = useState(0);
  // Growth Mindset
  const [GrowthMindsetValue, setGrowthMindsetValue] = useState(0);
  // Cognitive Flexibility
  const [CognitiveFlexibilityValue, setCognitiveFlexibilityValue] = useState(0);
  // Grit
  const [GritValue, setGritValue] = useState(0);
  // Resilience
  const [ResilienceValue, setResilienceValue] = useState(0);
  // store RuleBreaking data
  const [RuleBreakingValue, setRuleBreakingValue] = useState(0);
  // Empathy
  const [EmpathyValue, setEmpathyValue] = useState(0);
  //Need To Achieve
  const [NeedToAchieveValue, setNeedToAchieveValue] = useState(0);
  //Imposter Syndrome
  const [ImposterSyndromeValue, setImposterSyndromeValue] = useState(0);
  // Tolerate Ambiguity
  const [ToleranceForAmbiguityValue, setToleranceForAmbiguityValue] =
    useState(0);
  // store Curiosity data
  const [CuriosityJoyousExploration, setCuriosityJoyousExploration] =
    useState(0);
  const [CuriosityDeprivationSensitivity, setCuriosityDeprivationSensitivity] =
    useState(0);
  const [CuriosityStressTolerance, setCuriosityStressTolerance] = useState(0);
  const [CuriosityThrillSeeking, setCuriosityThrillSeeking] = useState(0);
  const [CuriosityOvertSocial, setCuriosityOvertSocial] = useState(0);
  const [CuriosityCovertSocial, setCuriosityCovertSocial] = useState(0);
  const [HarmoniousPassionValue, setHarmoniousPassionValue] = useState(0);
  const [ObsessivePassionValue, setObsessivePassionValue] = useState(0);

  const [type, setType] = useState({
    name: "",
    path: "PassionScale.HarmoniousPassion",
    res: 0,
  });

  // Get the data from the database
  function getall() {
    fetch("/api/results/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        // set these values to zero initially before calculation
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
        //RuleBreaking
        //let RuleBreaking = 0;
        let CuriosityJoyousExploration = 0;
        let CuriosityDeprivationSensitivity = 0;
        let CuriosityStressTolerance = 0;
        let CuriosityThrillSeeking = 0;
        let CuriosityCovertSocial = 0;
        let CuriosityOvertSocial = 0;
        // Growth
        let GrowthOrientationValue = 0;
        let GrowthMindsetValue = 0;
        let CognitiveFlexibilityValue = 0;
        let GritValue = 0;
        let ResilienceValue = 0;
        // Growth 2
        let RuleBreakingValue = 0;
        let EmpathyValue = 0;
        let NeedToAchieveValue = 0;
        let ImposterSyndromeValue = 0;
        let ToleranceForAmbiguityValue = 0;
        //
        let HarmoniousPassionValue = 0;
        let ObsessivePassionValue = 0;

        // For all of the data in the results table, go through each
        // column and use the calculateResults function to calculate 
        // the score for measures
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
          // Adaptive Success
          if (!isNaN(calculateResults(data[i]).resultSet.RuleBreaking.Total)) {
            RuleBreakingValue += calculateResults(data[i]).resultSet
              .RuleBreaking.Total;
          }
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

        // Set the calculated result values to the constant made earlier
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
        // Adaptive Success
        setRuleBreakingValue(
          (RuleBreakingValue / (data.length - 1)).toFixed(3)
        );
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

  const handleClickOpen = (type) => {
    setType(type);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const componentRef = useRef();

  let resultSet = props.location.state.resultSet;

  function SectionProgress(props) {
    return (
      <div>
        <Typography
          variant="body2"
          style={{
            paddingTop: "5px",
            paddingBottom: "5px",
            textAlign: "center",
          }}
        >
          {props.name}
        </Typography>
        <Progress
          variant="determinate"
          value={props.value}
          style={{ height: "10px", maxWidth: "100px", margin: "auto" }}
        />
      </div>
    );
  }

//NOTE: ERROR OCCUR BELOW when trying to load form question page

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
  const getDocument = () => {
    // TARGETS SECTION WITH REF as ID in return code
    const input = document.getElementById("REF");
    html2canvas(input, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgWidth = 180;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("img/png");
      const document = new jsPDF("p", "mm", "a4");
      // Background Setup
      document.setFillColor("#39AC7E");
      document.rect(0, 0, 230, 297, "F");
      document.setFillColor("white");
      document.roundedRect(5, 5, 200, 280, 5, 5, "F");
      // Document Footer
      document.setFillColor("#d96230");
      document.rect(0, 282, 230, 15, "F");
      document.setTextColor("white");
      document.setFontSize(11);
      document.text(
        "© Copyright 2023 - Entremap - All rights reserved.",
        5,
        291
      );
      document.text("Contact: entremapco@gmail.com", 147, 291);
      // Add image to doc
      document.addImage(imgData, "PNG", 15, 15, imgWidth, imgHeight);
      // Process Document
      document.save("YourMindsetReport.PDF");
    });
  };


  const getFullReport = () => {
    if(loading) return;
    setLoading(true);
    requestIsProUser().then(isProUser => {
      history.push({
        pathname: isProUser ? '/resultExtended' : '/stripe',
        state: isProUser ? { resultSet } : {},
      });
    }).then(() => {
      setLoading(false);
    });
  }

  return (
    <div
      style={{
        backgroundColor:"#39AC7E",
      }}
    >
      <NavBar isLoggedIn={true} />
      <div
        style={{
          margin: "auto",
          width: "100%",
          paddingTop: "30px",
          paddingBottom: "50px",
        }}
      >
        <Box
          boxShadow={1}
          color="text.primary"
          id={"Result"}
          style={{
            margin: "auto",
            width: isMobile ? "100vw" : "794px",
            backgroundColor: isMobile ? "transparent" : "white",
            padding: isMobile ? "0 12px" : "2vw",
            marginBottom: "10px",
            boxSizing: isMobile ? "border-box" : "unset",
            boxShadow: isMobile ? "none" : undefined,
          }}
        >
          <ReactToPrint
            trigger={() => (
              <Button
                variant="contained"
                size={isMobile ? "small" : "large"}
                color="primary"
                style={{ marginRight: isMobile ? "4px" : "50px" }}
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
            size={isMobile ? "small" : "large"}
            color="primary"
            style={{ marginRight: isMobile ? "4px" : "50px" }}
            component={Link}
            to={{ pathname: "/resultdetails", state: props.location.state }}
          >
            Details
          </Button>
          {/* GET PDF FUNCTION */}
          <Button
            variant="contained"
            size={isMobile ? "small" : "large"}
            color="primary"
            style={{ marginRight: isMobile ? "4px" : "50px" }}
            onClick={() => getDocument()}
          >
            Export PDF
          </Button>
          {/* TEST STRIPE */}

          <Button
            variant="contained"
            size={isMobile ? "small" : "large"}
            color="primary"
            style={{ marginRight: isMobile ? "4px" : "50px" }}
            onClick={() => getFullReport()}
          >
            Full Report
          </Button>
        </Box>
        <Box
          boxShadow={1}
          color="text.primary"
          id={"Result"}
          style={{
            margin: "auto",
            width: isMobile ? "100vw" : "794px",
            minHeight: "1123px",
            backgroundColor: isMobile ? "transparent" : "white",
            padding: isMobile ? "0 12px" : "2vw",
            boxSizing: isMobile ? "border-box" : "unset",
            color: isMobile ? "#fff" : "#000",
          }}
        >
          <div
            id="REF"
            ref={componentRef}
            style={{
              width: isMobile ? "100%" : "790px",
              minHeight: "1120px",
            }}
          >
            <Typography variant="h5" align="center">
              Entremap Mindset Report
            </Typography>
            <Typography variant="body2">{resultSet.name}</Typography>
            <Grid container spacing={1}>
              <Grid variant="body2" item xs="6">
                {format(new Date(resultSet.date), "dd/MM/yyyy")}
              </Grid>
              <Grid item xs="6" align="right"></Grid>
            </Grid>
            <div style={{ height: 12, width: "100%" }} />
            <Divider></Divider>
            <div style={{ height: 12, width: "100%" }} />
            <Typography variant="body2">Pending summary.</Typography>
            <div style={{ height: 12, width: "100%" }} />
            
            <div style={{ height: 12, width: "100%" }} />
            <Grid columns="2">
              <Grid container spacing={1}>
                <Grid item xs={isMobile ? "12" : "6"}>
                  <Typography
                    variant="body1"
                    style={{ paddingTop: "60px", paddingBottom: "0px" }}
                    align="center"
                    onClick={() => {
                      handleClickOpen({
                        name: "Well-Rounded Cognitive Function",
                        path: "Curiosity.Total",
                        res: resultSet.Curiosity.Total,
                      });
                    }}
                  >
                    Well-Rounded Cognitive Function
                  </Typography>
                  <Bar data={growthData} options={growthOptions}></Bar>
                </Grid>
                <Grid
                  item
                  xs={isMobile ? "12" : "6"}
                  style={{ maxHeight: "250px" }}
                >
                  <Typography
                    variant="body1"
                    style={{
                      paddingTop: "5px",
                      paddingBottom: "0px",
                      marginBottom: 12,
                    }}
                    align="center"
                    onClick={() => {
                      handleClickOpen({
                        name: "Entrepreneurial Passion",
                        path: "EntrepreneurialPassion.Total",
                        res: resultSet.EntrepreneurialPassion.Total,
                      });
                    }}
                  >
                    Entrepreneurial Passion
                  </Typography>
                  <Radar
                    data={EPdata}
                    options={EPOptions}
                    style={{ margin: "auto", height: "65%" }}
                  ></Radar>
                </Grid>
              </Grid>
            </Grid>
            <div style={{ height: 12, width: "100%" }} />
            <Grid columns="2">
              <Grid container spacing={3}>
                <Grid item xs={isMobile ? "12" : "6"}>
                  <Typography
                    variant="body1"
                    style={{ paddingTop: "60px", paddingBottom: "0px" }}
                    align="center"
                    onClick={() => {
                      handleClickOpen({
                        name: "Adaptive Success",
                        path: "Curiosity.Total",
                        res: resultSet.Curiosity.Total,
                      });
                    }}
                  >
                    Adaptive Success
                  </Typography>
                  <Bar data={growth2Data} options={growth2Options}></Bar>
                </Grid>

                <Grid item xs= {isMobile ? "12" : "6"}>
                  <Typography
                    variant="body1"
                    style={{ paddingTop: "27px", paddingBottom: "0px" }}
                    align="center"
                    onClick={() => {
                      handleClickOpen({
                        name: "Individual Entrepreneurial Orientation",
                        path: "IndividualEntrepreneurialOrientation.RiskTaking",
                        res: resultSet.IndividualEntrepreneurialOrientation
                          .RiskTaking,
                      });
                    }}
                  >
                    Individual Entrepreneurial Orientation
                  </Typography>
                  <div style={{ maxHeight: "250px" }}>
                    <Radar
                      data={IEOData}
                      options={IEOOptions}
                      style={{ margin: "auto" }}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid columns="2">
              <Grid container spacing={1}>
                <Grid item xs={isMobile ? "12" : "6"}>
                  <Typography
                    variant="body1"
                    style={{
                      paddingTop: "0px",
                      paddingBottom: "0px",
                    }}
                    align="center"
                    onClick={() => {
                      handleClickOpen({
                        name: "Entrepreneurial Self Efficacy",
                        path: "EntrepreneurialSelfEfficacy.Total",
                        res: resultSet.EntrepreneurialSelfEfficacy.Total,
                      });
                    }}
                  >
                    Entrepreneurial Self Efficacy
                  </Typography>
                  <Bar options={ESEOptions} data={ESEData} />
                </Grid>

                <Grid item xs={isMobile ? "12" : "6"}>
                  <Typography
                    variant="body1"
                    style={{
                      paddingTop: "0px",
                      paddingBottom: "0px",
                      paddingLeft: "0px",
                    }}
                    align="center"
                    onClick={() => {
                      handleClickOpen({
                        name: "Curiosity",
                        path: "Curiosity.Total",
                        res: resultSet.Curiosity.Total,
                      });
                    }}
                  >
                    Curiosity
                  </Typography>
                  <Radar data={CUdata} options={CUOptions}>style={{ margin: "auto" }}</Radar>
                </Grid>
              </Grid>
            </Grid>
            <Grid columns="2">
              <Grid container spacing={1}>
                <Grid item xs= {isMobile ? "12" : "6"}>
                  <Typography
                    variant="body1"
                    style={{ paddingTop: "0px", paddingBottom: "0px" }}
                    align="center"
                    onClick={() => {
                      handleClickOpen({
                        name: "Motivation at Work",
                        path: "MotivationAtWork.Total",
                        res: resultSet.MotivationAtWork.Total,
                      });
                    }}
                  >
                    Motivation at Work
                  </Typography>
                  <Bar options={MaWoptions} data={MaWdata} />
                </Grid>
                <Grid item xs={isMobile ? "12" : "5"}>
                  <Typography
                    variant="body1"
                    style={{ paddingTop: "0px", paddingBottom: "0px" }}
                    align="center"
                    onClick={() => {
                      handleClickOpen({
                        name: "The Big Five",
                        path: "TheBigFive.Total",
                        res: resultSet.TheBigFive.Total,
                      });
                    }}
                  >
                    The Big Five
                  </Typography>
                  <Radar data={TBFdata} options={TBFOptions}>style={{ margin: "auto" }}</Radar>
                </Grid>
              </Grid>
            </Grid>
            <Grid columns="2">
              <Grid container spacing={1}>
              <Grid item xs={isMobile ? '12' : '6'}>
                <Typography
                  variant="body1"
                  style={{ paddingTop: '30px', paddingBottom: '0px', paddingLeft: '10px' }}
                  align="center"
                  onClick={() => {
                    handleClickOpen({
                      name: 'Fear of Failure',
                      path: 'FearOfFailure.Total',
                      res: resultSet.FearOfFailure.Total,
                    });
                  }}
                >
                  Fear of Failure
                </Typography>
                <Bar options={FOFOptions} data={FOFData} />
              </Grid>
                </Grid>
              </Grid>
          </div>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{type.name}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {getResponse(`${type.path}`, type.res)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="contained">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
}

export default Results;
