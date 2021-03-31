"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var jobCtrl = _interopRequireWildcard(require("../controllers/job.controllers"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var jobRouter = (0, _express.Router)();
jobRouter.get('/completed', jobCtrl.getCompletedJobs);
jobRouter.put('/complete/:id', jobCtrl.completeJob);
jobRouter.get('/', jobCtrl.getJobs);
jobRouter.get('/:id', jobCtrl.getJob);
jobRouter.post('/', jobCtrl.createJob);
jobRouter.put('/:id', jobCtrl.updateJob);
jobRouter.delete('/:id', jobCtrl.deleteJob);
var _default = jobRouter;
exports.default = _default;