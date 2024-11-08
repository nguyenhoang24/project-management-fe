<script>
import {barChartStatistic, lineChartStatistic} from "@/pages/charts/apex/data";
import MdFilterCampaign from "@/components/statistic/MdFilterCampaign.vue";

/**
 * Advanced-table component
 */

/**
 * Chartjs-chart component
 */
export default {
    name: 'Campaign',
    components: {
        MdFilterCampaign
    },
    data() {
        return {
            tableData: [
                {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345al Systems Engineer',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    numberRequets: '234',
                    startJourney: '234',
                    contactJoinedJourney: '234',
                    inJourney: '234',
                    endJourney: '234',
                    numberAdsChannel: '234',
                    numberReceivingMessages: '234',
                    interactiveNumber: '234',
                    interactiveSubscriberNumber: '234',
                    totalInteractions: '234',
                    totalSubscriberInteractions: '234',
                    numberConversionsByChannel: '234',
                    numberSubscribersConvertedByChannel: '234',
                    ratio: '234',
                    manipulation: '234',
                },
            ],
            lineChartStatistic: lineChartStatistic,
            barChartStatistic: barChartStatistic,

            title: "Campaign",
            items: [{
                text: "Tables"
            },
                {
                    text: "Campaign",
                    active: true
                }
            ],
            flavours: [
                'Tên chiến dịch',
                'ID chiến dịch',
                'Số lượt yêu cầu quảng cáo',
                'Start journey',
                'Contact joined journey',
                'In journey',
                'End journey',
                'Số lượt quảng cáo theo từng kênh',
                'Số TB nhận thông điệp QC theo từng kênh',
                'Số lượt tương tác theo từng kênh',
                'Số thuê bao tương tác theo kênh',
                'Tổng số lượt tương tác',
                'Tổng số thuê bao tương tác',
                'Số lượt chuyển đổi theo từng kênh',
                'Số thuê bao chuyển đổi theo kênh',
                'Tỷ lệ',
                'Thao tác',
            ],
            selected: [],
            allSelected: false,
            indeterminate: false,
            showTable: true,
            showCharts: false,
            showLineChart: true,
            showBarChart: true,
            tabActive: 1,
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: "age",
            sortDesc: false,
            fields: [
                {
                    key: "nameCampaign",
                    label: 'Tên chiến dịch',
                    sortable: true
                },
                {
                    key: "campaignId",
                    label: 'ID chiến dịch',
                    sortable: true
                },
                {
                    key: "numberRequets",
                    label: 'Số lượt yêu cầu quảng cáo',
                    sortable: true
                },
                {
                    key: "startJourney",
                    label: 'Start journey',
                    sortable: true
                },
                {
                    key: "contactJoinedJourney",
                    label: 'Contact joined journey',
                    sortable: true,
                },
                {
                    key: "inJourney",
                    label: 'In journey',
                    sortable: true,
                },
                {
                    key: "endJourney",
                    label: 'End journey',
                    sortable: true,
                },
                {
                    key: "numberAdsChannel",
                    label: 'Số lượt quảng cáo theo từng kênh',
                    sortable: true,
                },
                {
                    key: "numberReceivingMessages",
                    label: 'Số thuê bao nhận thông điệp quảng cáo theo từng kênh',
                    sortable: true,
                },
                {
                    key: "interactiveNumber",
                    label: 'Số lượt tương tác theo từng kênh',
                    sortable: true,
                },
                {
                    key: "interactiveSubscriberNumber",
                    label: 'Số thuê bao tương tác theo kênh',
                    sortable: true,
                },
                {
                    key: "totalInteractions",
                    label: 'Tổng số lượt tương tác',
                    sortable: true,
                },
                {
                    key: "totalSubscriberInteractions",
                    label: 'Tổng số thuê bao tương tác',
                    sortable: true,
                },
                {
                    key: "numberConversionsByChannel",
                    label: 'Số lượt chuyển đổi theo từng kênh',
                    sortable: true,
                },
                {
                    key: "numberSubscribersConvertedByChannel",
                    label: 'Số thuê bao chuyển đổi theo kênh',
                    sortable: true,
                },
                {
                    key: "ratio",
                    label: 'Tỷ lệ',
                    sortable: true,
                },
                {
                    key: "manipulation",
                    label: 'Thao tác',
                    sortable: true,
                },
            ]
        };
    },
    computed: {
        /**
         * Total no. of records
         */
        rows() {
            return this.tableData.length;
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length;
    },
    methods: {
        /**
         * Search the table data with search input
         */
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        searchCustomer() {
            console.log('customer')
        },
        toggleAll(checked) {
            this.selected = checked ? this.flavours.slice() : []
        },
        handleReset() {
            console.log('handleActionReset')
            this.showTable = true;
            this.showCharts = false;
            this.showLineChart = true;
            this.showBarChart = true;
        },
        handleFilter() {
            console.log('handleActionFilter')
        },
        handleActionChart() {
            console.log('handleActionChart')
            this.showTable = false;
            this.showCharts = true;
        },
        handleActionSetting() {
            console.log('handleActionSetting: ', this.allSelected)
        },
        handleCloseLineChart() {
            console.log('close chart')
            this.showLineChart = false;
        },
        handleCloseBarChart() {
            console.log('close chart')
            this.showBarChart = false;
        }
    },
    middleware: "authentication"
};
</script>

<template>
    <div>
        <!-- Search -->
        <!--        <div class="row">-->
        <!--            <div class="col-12">-->
        <!--                <div class="card">-->
        <!--                    <div class="card-body">-->
        <!--                        <div class="row">-->
        <!--                            <div class="col-3">-->
        <!--                                <label>Thuê bao</label>-->
        <!--                                <input type="text" class="form-control form-control-sm" placeholder="Nhập SĐT"/>-->
        <!--                            </div>-->
        <!--                            <div class="col-3">-->
        <!--                                <label>Date Range</label>-->
        <!--                                <br />-->
        <!--                                <date-picker-->
        <!--                                    v-model="daterange"-->
        <!--                                    range-->
        <!--                                    append-to-body-->
        <!--                                    lang="vi"-->
        <!--                                    confirm-->
        <!--                                    placeholder="Từ ngày - đến ngày"-->
        <!--                                ></date-picker>-->
        <!--                            </div>-->
        <!--                            <div class="col-3">-->
        <!--                                <label>Kênh truyền thông</label>-->
        <!--                                <select class="form-select form-select-sm">-->
        <!--                                    <option>Chọn</option>-->
        <!--                                    <option>Large select</option>-->
        <!--                                    <option>Small select</option>-->
        <!--                                </select>-->
        <!--                            </div>-->
        <!--                            <div class="col-2">-->
        <!--                                <label>&ensp;</label>-->
        <!--                                <button type="button" class="btn btn-sm btn-primary d-block"><i class="uil uil-search me-2"></i> Tìm kiếm</button>-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->
        <!-- Table data -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row mb-4">
                            <div class="col">
                                <label>Tên chiến dịch</label>
                                <input type="number" class="form-control" placeholder="Tên, mã chiến dịch"/>
                            </div>
                            <div class="col">
                                <label>Từ ngày</label>
                                <input type="date" value="" class="form-control"/>
                            </div>
                            <div class="col">
                                <label>Đến ngày</label>
                                <input type="date" value="" class="form-control"/>
                            </div>
                            <div class="col">
                                <label>Thời gian báo cáo</label>
                                <select class="form-select">
                                    <option>Chọn</option>
                                    <option>Hôm nay</option>
                                    <option>Hôm qua</option>
                                    <option>Tuần này</option>
                                    <option>Tuần trước</option>
                                    <option>Tháng này</option>
                                    <option>Tháng trước</option>
                                    <option>Năm nay</option>
                                </select>
                            </div>
                            <div class="col">
                                <label>&ensp;</label>
                                <button @click="searchCustomer" type="button" class="btn btn-primary d-block"><i class="uil uil-search me-2"></i> Tìm kiếm</button>
                            </div>
                        </div>
                        <div class="row mb-1 align-items-center">
                            <div class="col-6">
                                <span class="tab-active cursor-pointer p-1" @click="tabActive = 1" :class="tabActive == 1 ? 'border-active text-active' : ''">Thử nghiệm</span>
                                <span class="tab-active cursor-pointer p-1" @click="tabActive = 2" :class="tabActive == 2 ? 'border-active text-active' : ''">Chính thức</span>
                                <span class="tab-active cursor-pointer p-1" @click="tabActive = 3" :class="tabActive == 3 ? 'border-active text-active' : ''">Tổng hợp</span>
                            </div>
                            <div class="col-6 text-end">
                                <b-dropdown variant="outline-secondary" ref="dropdown" menu-class="custom-dropdown" toggle-class="test-toggle">
                                    <template v-slot:button-content>
                                        Thiết lập cột
                                        <i class="mdi mdi-chevron-down"></i>
                                    </template>
                                    <simplebar style="max-height: 300px;" data-simplebar>
                                        <b-form-checkbox
                                            v-model="allSelected"
                                            :indeterminate="indeterminate"
                                            aria-describedby="flavours"
                                            aria-controls="flavours"
                                            @change="toggleAll"
                                        >
                                            Tất cả
                                        </b-form-checkbox>
                                        <b-form-checkbox-group
                                            id="flavors"
                                            v-model="selected"
                                            :options="flavours"
                                            aria-describedby="flavours"
                                            name="flavors"
                                            class="ml-4 custom-check-group"
                                            aria-label="Individual flavours"
                                            stacked
                                        ></b-form-checkbox-group>
                                    </simplebar>
                                    <b-button @click="handleActionSetting" variant="primary" class="w-100">Áp dụng</b-button>
                                </b-dropdown>
                                <button @click="handleFilter" type="button" class="btn btn-outline-secondary pe-lg-4 ps-lg-4" v-b-modal.modal-filter>
                                    <i class="uil uil-filter mr-2"></i> Lọc
                                </button>
                                <button @click="handleReset" type="button" class="btn btn-outline-secondary pe-lg-4 ps-lg-4">
                                    <i class="uil uil-history mr-2"></i> Trở về mặc định
                                </button>
                            </div>
                        </div>
                        <!-- Table -->
                        <div v-show="tabActive == 1">
                            <div class="table-responsive mb-1" v-if="showTable">
                                <b-table hover bordered :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                                    <template v-slot:cell(manipulation)>
                                        <div>
                                            <i @click="handleActionChart" class="uil uil-chart-bar font-size-18 cursor-pointer"></i>
                                            <i class="uil uil-file-download-alt font-size-18"></i>
                                        </div>
                                    </template>
                                </b-table>
                            </div>
                            <div class="row" v-if="showTable">
                                <div class="col-6 d-inline-flex">
                                    <label class="d-inline-flex align-items-center mb-0 pb-0">
                                        <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>
                                        Chiến dịch/Trang
                                    </label>
                                </div>
                                <div class="col-6">
                                    <b-pagination
                                        class="mb-0" align="right"
                                        v-model="currentPage"
                                        :total-rows="rows"
                                        :per-page="perPage"
                                    ></b-pagination>
                                </div>
                            </div>
                            <md-filter-campaign></md-filter-campaign>
                        </div>
                        <div v-show="tabActive == 2">Chính thức</div>
                        <div v-show="tabActive == 3">Tổng hợp</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="showCharts">
            <div class="col-6" v-if="showBarChart">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h4 class="card-title mb-4">Số lượt yêu cầu quảng cáo</h4>
                            <div>
                                <i class="uil uil-edit-alt font-size-18 me-4 cursor-pointer"></i>
                                <i class="uil uil-multiply font-size-18 cursor-pointer" @click="handleCloseBarChart"></i>
                            </div>
                        </div>
                        <!-- Bar Chart -->
                        <apexchart class="apex-charts" height="500" type="bar" dir="ltr" :series="barChartStatistic.series" :options="barChartStatistic.chartOptions"></apexchart>
                    </div>
                </div>
            </div>
            <div class="col-6" v-if="showLineChart">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h4 class="card-title mb-4">Start journey</h4>
                            <div>
                                <i class="uil uil-edit-alt font-size-18 me-4 cursor-pointer"></i>
                                <i class="uil uil-multiply font-size-18 cursor-pointer" @click="handleCloseLineChart"></i>
                            </div>
                        </div>
                        <!-- Line Chart -->
                        <apexchart class="apex-charts" height="500" type="line" dir="ltr" :series="lineChartStatistic.series" :options="lineChartStatistic.chartOptions"></apexchart>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/*.custom-select {*/
/*    border-radius: 1.25rem;*/
/*    padding: 0.5rem;*/
/*    margin-right: 0.5rem;*/
/*}*/

/*.form-control-sm {*/
/*    padding: 0.5rem;*/
/*}*/

/*.form-select-sm {*/
/*    padding: 0.5rem;*/
/*}*/

/*.btn-sm {*/
/*    padding: 0.5rem 1rem;*/
/*}*/

/*.tab-item {*/
/*    font-size: 14px;*/
/*    line-height: 24px;*/
/*    font-weight: 600;*/
/*    color: #004390;*/
/*    padding: 0 0.5rem 0.5rem 0.5rem;*/
/*}*/

.border-active {
    border-bottom: 1px solid #004390;
}

/*.dropdown-menu {*/
/*    min-width: 350px;*/
/*    max-height: 400px;*/
/*    overflow: auto;*/
/*}*/

/*.custom-check-group {*/

/*}*/

/*.custom-dropdown {*/
/*    padding: 0.5rem 1rem;*/
/*}*/

/*.custom-control-label {*/
/*    margin-left: 0.5rem;*/
/*}*/
.tab-active {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #808191;
}
.text-active {
    color: #004390 !important;
}
/*.text-y, .text-x {*/
/*    fill: #1A1D1F !important;*/
/*}*/
</style>
