"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.completeJob = exports.getCompletedJobs = exports.deleteJob = exports.updateJob = exports.getJob = exports.getJobs = exports.createJob = void 0;

var _job = _interopRequireDefault(require("../models/job.model"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createJob = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      jobName,
      pricePerHour,
      clientName,
      technologies
    } = req.body;
    var user = req.user;
    var earnings = 0;
    var seconds = 0;
    var time = '00:00:00';
    var completed = false;
    var date = (0, _moment.default)().format('LL'); //console.log(user);

    var job = new _job.default({
      name: jobName,
      client: clientName,
      pricePerHour,
      earnings,
      seconds,
      time,
      completed,
      date,
      userOwner: user._id,
      technologies
    });
    console.log(job);

    try {
      yield job.save();
      user.jobs.push(job);
      yield user.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Saved job successfully',
      data: job
    });
  });

  return function createJob(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createJob = createJob;

var getJobs = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var {
      _id
    } = req.user; //const user = await User.findById(_id).populate('jobs',);

    var jobs = yield _job.default.find({
      userOwner: _id,
      completed: false
    });
    return res.status(200).json({
      success: true,
      data: jobs
    });
  });

  return function getJobs(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getJobs = getJobs;

var getJob = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var jobId = req.params.id;
    var job = yield _job.default.findById(jobId);
    return res.status(200).json({
      success: true,
      data: job
    });
  });

  return function getJob(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getJob = getJob;

var updateJob = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var jobId = req.params.id;

    var updateQueryJob = _objectSpread({}, req.body);

    var updatedJob = yield _job.default.findByIdAndUpdate(jobId, updateQueryJob, {
      new: true
    });
    return res.status(200).json({
      success: true,
      message: 'Updated job',
      data: updatedJob
    });
  });

  return function updateJob(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateJob = updateJob;

var deleteJob = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var jobId = req.params.id;
    yield _job.default.findByIdAndDelete(jobId);
    return res.status(200).json({
      success: true,
      message: 'Deleted job'
    });
  });

  return function deleteJob(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteJob = deleteJob;

var getCompletedJobs = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    var jobsCompleted = yield _job.default.find({
      completed: true
    });
    return res.status(200).json({
      succes: true,
      data: jobsCompleted
    });
  });

  return function getCompletedJobs(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getCompletedJobs = getCompletedJobs;

var completeJob = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    var jobId = req.params.id;
    var {
      completed
    } = req.body; //const completedDate = moment().format('LL');

    console.log(completed);
    var updatedJob = yield _job.default.findByIdAndUpdate(jobId, {
      completed
    }, {
      new: true
    });
    return res.status(200).json({
      success: 'true',
      message: 'Job is now completed',
      data: updatedJob
    });
  });

  return function completeJob(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.completeJob = completeJob;