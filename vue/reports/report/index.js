
import VueClass from 'vue';

const Vue = window.Vue? window.Vue: VueClass;

import description from './Description.vue';
Vue.component('description-rp', description);

import overviewRp from './Overview.vue';
Vue.component('overview-rp', overviewRp);

import DimensionsRawRp from './DimensionsRaw.vue';
Vue.component('dimensions-raw-rp', DimensionsRawRp);

import barGraph from './BarGraph.vue';
Vue.component('bar-graph-rp', barGraph);

import transBarGraph from './TransBarGraph.vue';
Vue.component('trans-bar-graph-rp', transBarGraph);

import curveChart from './CurveChart.vue';
Vue.component('curve-chart-rp', curveChart);

import mutiCurveChart from './MutiCurveChart.vue';
Vue.component('muti-curve-chart-rp', mutiCurveChart);

import compareCurveChart from './CompareCurveChart.vue';
Vue.component('compare-curve-chart-rp', compareCurveChart);

import lineChart from './LineChart.vue';
Vue.component('line-chart-rp', lineChart);

import dimensionComment from './DimensionComment.vue';
Vue.component('dimension-comment-rp', dimensionComment);

import blendChart from './BlendChart.vue';
Vue.component('blend-chart-rp', blendChart);

import mutiBlendChart from './MutiBlendChart.vue';
Vue.component('muti-blend-chart-rp', mutiBlendChart);

import crossQuadrant from './CrossQuadrant.vue';
Vue.component('cross-quadrant-rp', crossQuadrant);

import overviewRaw from './OverviewRaw.vue';
Vue.component('overview-raw-rp', overviewRaw);

import radarChart from './RadarChart.vue';
Vue.component('radar-chart-rp', radarChart);

import dimensionCommentAdvice from './DimensionCommentAdvice.vue';
Vue.component('dimension-comment-advice-rp', dimensionCommentAdvice);

import totalComment from './TotalComment.vue';
Vue.component('total-comment-rp', totalComment);

import totalAdvice from './TotalAdvice.vue';
Vue.component('total-advice-rp', totalAdvice);

import circleComment from './CircleComment.vue';
Vue.component('circle-comment-rp',circleComment);
