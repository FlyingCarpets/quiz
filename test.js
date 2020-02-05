'use strict';
var optimoveSDK = function() {
  var _configuration, _coreEvents, _userEmail, _levels, _loggerLevel, _sdkDomain = '//sdk-cdn.optimove.net/',
    _configFileUrl = '', _hostname = '', _userId = null,
    eventPlatformIDKey = '0b006d8eb623b8ea11b73d61f1e483b47b9d7422',
    eventDeviceTypeIDKey = '4ba302311571f45d57f1aa75e428b9b78d59a7a2',
    eventOSIDKey = '85bdeae0a9e0dad7fdd022d8f90da5d3a241b3d0',
    eventNativeMobile = 'd0df7f0a4c2724ff587c1cfb3e315b432e2d1f50', logger = (_levels = {
      info: 1,
      warning: 2,
      error: 3,
      none: 4
    }, _loggerLevel = 'none', {
      setLevel: function(logLevel) {
        _loggerLevel = logLevel;
      }, log: function(level, message) {
        if (_levels[level] >= _levels[_loggerLevel]) switch (_levels[level]) {
          case 1:
            console.info(message);
            break;
          case 2:
            console.warn(message);
            break;
          case 3:
            console.error(message);
            break;
          default:
            console.log(message);
        }
      }
    }), _SHA1_SHA1 = function(msg) {
      var blockstart, i, j, A, B, C, D, E, temp, rotate_left = function(n, s) {
          return n << s | n >>> 32 - s;
        }, cvt_hex = function(val) {
          var i, str = '';
          for (i = 7; i >= 0; i--) str += (val >>> 4 * i & 15).toString(16);
          return str;
        }, W = new Array(80), H0 = 1732584193, H1 = 4023233417, H2 = 2562383102, H3 = 271733878, H4 = 3285377520,
        msg_len = (msg = function(string) {
          string = string.replace(/\r\n/g, '\n');
          for (var utftext = '', n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            c < 128 ? utftext += String.fromCharCode(c) : c > 127 && c < 2048 ? (utftext += String.fromCharCode(c >> 6 | 192), utftext += String.fromCharCode(63 & c | 128)) : (utftext += String.fromCharCode(c >> 12 | 224), utftext += String.fromCharCode(c >> 6 & 63 | 128), utftext += String.fromCharCode(63 & c | 128));
          }
          return utftext;
        }(msg)).length, word_array = new Array;
      for (i = 0; i < msg_len - 3; i += 4) j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 | msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3), word_array.push(j);
      switch (msg_len % 4) {
        case 0:
          i = 2147483648;
          break;
        case 1:
          i = msg.charCodeAt(msg_len - 1) << 24 | 8388608;
          break;
        case 2:
          i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 32768;
          break;
        case 3:
          i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 128;
      }
      for (word_array.push(i); word_array.length % 16 != 14;) word_array.push(0);
      for (word_array.push(msg_len >>> 29), word_array.push(msg_len << 3 & 4294967295), blockstart = 0; blockstart < word_array.length; blockstart += 16) {
        for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
        for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        for (A = H0, B = H1, C = H2, D = H3, E = H4, i = 0; i <= 19; i++) temp = rotate_left(A, 5) + (B & C | ~B & D) + E + W[i] + 1518500249 & 4294967295, E = D, D = C, C = rotate_left(B, 30), B = A, A = temp;
        for (i = 20; i <= 39; i++) temp = rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 1859775393 & 4294967295, E = D, D = C, C = rotate_left(B, 30), B = A, A = temp;
        for (i = 40; i <= 59; i++) temp = rotate_left(A, 5) + (B & C | B & D | C & D) + E + W[i] + 2400959708 & 4294967295, E = D, D = C, C = rotate_left(B, 30), B = A, A = temp;
        for (i = 60; i <= 79; i++) temp = rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 3395469782 & 4294967295, E = D, D = C, C = rotate_left(B, 30), B = A, A = temp;
        H0 = H0 + A & 4294967295, H1 = H1 + B & 4294967295, H2 = H2 + C & 4294967295, H3 = H3 + D & 4294967295, H4 = H4 + E & 4294967295;
      }
      return (temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4)).toLowerCase();
    }, _Tools_cleanUrl = function(url) {
      return ['http://www.', 'http://', 'https://www.', 'https://'].forEach(function(str) {
        url = url.replace(str, '');
      }), url;
    }, _Tools_validatePageURL = function(customURL) {
      return /(https?|http?|ftp):\/\/[^\s\/$.?#].[^\s]*$/.test(customURL);
    }, _Tools_validateUserId = function(userId) {
      return void 0 !== userId && 'string' == typeof userId && null != userId && '' != userId && null != userId && 'null' != userId.toLowerCase() && 'none' != userId.toLowerCase() && !userId.toLowerCase().includes('undefine');
    }, setConfiguration = function(callback) {
      _configuration = self.optimoveTenantConfiguration, getPlaformInfoFromUserAgent(_configuration), _configuration.enableOptitrack ? (logger.log('info', 'call initializeOptiTrack'), optitrackModule.initializeOptiTrack(logger, _configuration, callback)) : callback(!0), _configuration.enableGDN;
    }, loadScript = function(url, callback) {
      var script = document.createElement('script');
      script.type = 'text/javascript', script.async = !0, script.defer = !0, script.readyState ? script.onreadystatechange = function() {
        'loaded' != script.readyState && 'complete' != script.readyState || (script.onreadystatechange = null, callback());
      } : script.onload = function() {
        callback();
      }, script.src = url, document.getElementsByTagName('head')[0].appendChild(script);
    };
  var _popup, _executionInProcess, closePopup, executePopup, callRealtimeAsync, eventValidation = {
    validateEvent: function(eventName, parameters) {
      var validEvent = {};
      if (_coreEvents.events.hasOwnProperty(eventName)) var event = _coreEvents.events[eventName]; else event = _configuration.events[eventName];
      var parssedTenantNetworkFailedEvents, currentTenantNetworkFailedEvents, parssedTenantNetworkCorrectEvents,
        currentTenantNetworkCorrectEvents,
        currentTenantFailedEvents = (null != (currentTenantNetworkFailedEvents = sessionStorage.getItem('tenantNetworkFailedEvents')) && 'undefined' != currentTenantNetworkFailedEvents && (parssedTenantNetworkFailedEvents = JSON.parse(currentTenantNetworkFailedEvents)), parssedTenantNetworkFailedEvents),
        currentTenantCorrectEvents = (null != (currentTenantNetworkCorrectEvents = sessionStorage.getItem('tenantNetworkCorrectEvents')) && 'undefined' != currentTenantNetworkCorrectEvents && (parssedTenantNetworkCorrectEvents = JSON.parse(currentTenantNetworkCorrectEvents)), parssedTenantNetworkCorrectEvents);
      return event ? (validEvent.userId = null, validEvent.visitorData = null, validEvent.eventName = eventName, validEvent.eventMetadata = event, validEvent.parameters = {}, eventValidation.parameterValidation(event, parameters, validEvent) ? (optmvIsOpen() && (currentTenantCorrectEvents.push(validEvent), window.sessionStorage.setItem('tenantNetworkCorrectEvents', JSON.stringify(currentTenantCorrectEvents))), validEvent) : (optmvIsOpen() && (currentTenantFailedEvents.push(validEvent), window.sessionStorage.setItem('tenantNetworkFailedEvents', JSON.stringify(currentTenantFailedEvents))), !1)) : (logger.log('info', 'event:' + eventName + ' does not exist!!'), optmvIsOpen() && (validEvent.errorMessage = 'Event name is unavailable. It has not been configured properly', currentTenantFailedEvents.push(validEvent), window.sessionStorage.setItem('tenantNetworkFailedEvents', JSON.stringify(currentTenantFailedEvents))), !1);
    }, parameterValidation: function(event, parameters, validEventObj) {
      var paramMetadata, isValid;
      if (!parameters || 'object' != typeof parameters || parameters.constructor !== Object) {
        var isMandatoryParamConfigured = !1;
        if (null != event.parameters) Object.keys(event.parameters).forEach(function(param_name) {
          0 == event.parameters[param_name].optional && (isMandatoryParamConfigured = !0);
        });
        return 1 != isMandatoryParamConfigured || (logger.log('error', 'event.id = ' + event.id + ' has Mandatory Parameters but Parameters are not defined'), !1);
      }
      try {
        var parameters_keys = Object.keys(parameters), eventParametersNames = Object.keys(event.parameters);
        parameters_keys.forEach(function(param_name) {
          if (!eventParametersNames.includes(param_name)) {
            errMsg = 'parameterValidation failed, parameter=' + param_name + ' is not exists!';
            throw validEventObj.errorMessage = param_name + ' parameter name is unavailable. It has not been configured properly', logger.log('error', errMsg), new Error(errMsg);
          }
          if (0 == event.parameters[param_name].optional && null == parameters[param_name]) {
            var errMsg = 'parameterValidation failed, parameter=' + param_name + ' is not legit!!, value is undefined';
            throw logger.log('error', errMsg), new Error(errMsg);
          }
        });
      } catch (error) {
        return logger.log('error', 'parameterValidation failed, parameters object cannot be parsed, object is not legit!! ' + error), !1;
      }
      for (var parameterName in event.parameters) if ((paramMetadata = event.parameters[parameterName]).hasOwnProperty('errorMessage') && delete paramMetadata.errorMessage, isValid = eventValidation.checkForConfigurationMatch(event, paramMetadata, parameters, parameterName), validEventObj && (validEventObj.parameters[parameterName] = {
        value: parameters[parameterName],
        metadata: paramMetadata
      }), !isValid) return !1;
      return !0;
    }, checkForConfigurationMatch: function(event, paramMetadata, parameters, parameterName) {
      if (paramMetadata.id >= 1e3) return !0;
      var i, listCount, isList = '[object Array]' === Object.prototype.toString.call(parameters[parameterName]);
      if (0 == paramMetadata.optional && null == parameters[parameterName]) return logger.log('info', 'required paramMetadata "' + parameterName + '" is missing'), paramMetadata.errorMessage = 'ERROR - required paramMetadata "' + parameterName + '" is missing', !1;
      if (null != parameters[parameterName]) {
        if ('String' === paramMetadata.type && 'string' != typeof parameters[parameterName]) return logger.log('info', 'parameter "' + parameterName + '" should be type of String'), paramMetadata.errorMessage = 'ERROR - parameter "' + parameterName + '" should be type of String', !1;
        if ('Number' === paramMetadata.type && 'number' != typeof parameters[parameterName]) return logger.log('info', 'parameter "' + parameterName + '" should be type of number'), paramMetadata.errorMessage = 'ERROR - parameter "' + parameterName + '" should be type of number', !1;
        if ('Boolean' === paramMetadata.type && 'boolean' != typeof parameters[parameterName]) return logger.log('info', 'parameter "' + parameterName + '" should be type of boolean'), paramMetadata.errorMessage = 'ERROR - parameter "' + parameterName + '" should be type of boolean', !1;
        if ('List' === paramMetadata.type && !isList) return logger.log('info', 'parameter "' + parameterName + '" should be type of array'), paramMetadata.errorMessage = 'ERROR - parameter "' + parameterName + '" should be type of array', !1;
      }
      if (isList) for (listCount = parameters[parameterName].length, i = 0; i < listCount; i++) if (!eventValidation.parameterValidation(event, parameters[parameterName][i], !1)) return !1;
      return !0;
    }
  }, persistSDKLocalData = function(THIS, key, updatedValue) {
    try {
      if (1 == _configuration.useLocalStorage) {
        var currValue = localStorage.getItem(key);
        null != currValue && currValue == updatedValue || localStorage.setItem(key, updatedValue);
      } else _logger.log('info', 'OptimoveSDK: persistSDKLocalData()  Not  Persisted');
    } catch (error) {
      var errMsg = 'OptimoveSDK: persistSDKLocalData ()  Failed error = ' + error;
      _logger.log('error', errMsg);
    }
  }, getPersistedSDKLocalData = function(THIS, key) {
    try {
      if (1 != _configuration.useLocalStorage) return logger.log('info', 'OptimoveSDK: getPersistedSDKLocalData()  key:' + key + ' Not Persisted'), null;
      var value = localStorage.getItem(key);
      if (null != value) return { key: key, value: value };
    } catch (error) {
      var errMsg = 'OptimoveSDK: getPersistedSDKLocalDatas ()  Failed error = ' + error;
      return logger.log('error', errMsg), null;
    }
  }, UserAgentcallBackFunc = function(responseData) {
    var deviceType = 'desktop', platform = 'windows', deviceOS = '';
    if (void 0 !== responseData) {
      var osName = responseData.os.name;
      platform = osName, deviceOS = osName + ' ' + responseData.os.version, Object.keys(responseData.device).length > 0 && void 0 !== responseData.device.type && (deviceType = responseData.device.type, logger.log('info', 'found deviceType=' + deviceType)), persistSDKLocalData(0, eventPlatformIDKey, platform), persistSDKLocalData(0, eventDeviceTypeIDKey, deviceType), persistSDKLocalData(0, eventOSIDKey, deviceOS), persistSDKLocalData(0, eventNativeMobile, 'false');
    }
  }, getPlaformInfoFromUserAgent = function(configuration) {
    void 0 === getPersistedSDKLocalData(0, eventPlatformIDKey) && function(configuration, callback) {
      window.navigator.userAgent;
      var xmlhttp = new XMLHttpRequest, url = configuration.sdkServicesEndPoint;
      xmlhttp.open('GET', url, !0), xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8'), xmlhttp.onreadystatechange = function() {
        try {
          if (4 == xmlhttp.readyState && 200 == xmlhttp.status) {
            var responseData = JSON.parse(xmlhttp.responseText);
            logger.log('info', responseData), callback && callback(responseData);
          }
        } catch (err) {
          logger.log('error', err);
        }
      }, xmlhttp.send();
    }(configuration, UserAgentcallBackFunc);
  }, getVisitorsInfoObj = function() {
    var visitorsInfo = optitrackModule.getOptitrackVisitorInfo(), visitorInfoObject = new Object;
    return null != visitorsInfo ? (visitorInfoObject.visitorId = visitorsInfo[1], visitorInfoObject.visitCount = visitorsInfo[3]) : (logger.log('error', 'in getVisitorsInfoObj Optitrack'), visitorInfoObject = void 0), visitorInfoObject;
  }, reportEvent = function(eventName, parameters, callback) {
    try {
      if (void 0 !== eventName) eventName = eventName.toLowerCase(), Object.keys(parameters).forEach(function(paramName) {
        var value = parameters[paramName], normalizedParamName = paramName.toLowerCase();
        parameters[normalizedParamName] = 'string' == typeof value ? value.trim() : value, paramName != normalizedParamName && delete parameters[paramName];
      }); else logger.log('error', 'reportEvent: eventName is undefined');
      var validEvent = eventValidation.validateEvent(eventName, parameters);
      if (validEvent) {
        if (null != (event_parameters = parameters) ? Object.getOwnPropertyNames(event_parameters).forEach(function(paramName) {
          var currParamValue = event_parameters[paramName];
          if ('string' == typeof currParamValue) {
            var normalizedValue = currParamValue.trim();
            event_parameters[paramName] = normalizedValue;
          }
        }) : logger.log('info', 'normalizeEventParameters: event parameter is null'), _configuration.enableOptitrack && validEvent.eventMetadata.supportedOnOptitrack) try {
          if (optmvIsOpen()) {
            var currentEventObject = {};
            currentEventObject.eventName = eventName, currentEventObject.parameters = parameters, currentEventObject.validEvent = validEvent;
          }
          optitrackModule.logEvent(eventName, parameters);
        } catch (err) {
          logger.log('error', err);
        }
        _configuration.enableRealtime && validEvent.eventMetadata.supportedOnRealTime && reportEventRealtime(validEvent, function() {
          callback && callback();
        });
      }
    } catch (err) {
      logger.log('error', err);
    }
    var event_parameters;
  }, reportEventRealtime = function(validEvent, callback) {
    if (validEvent) {
      if (_configuration.enableOptitrack && _configuration.enableVisitors && (validEvent.visitorData = optitrackModule.getOptitrackVisitorInfo()), !_userId && !_configuration.enableVisitors) return logger.log('info', 'No user id please call the setUserId method'), !1;
      realTimeModule.reportEvent(validEvent, callback);
    }
  }, realTimeModule = (_executionInProcess = !1, callRealtimeAsync = function(event, data, callback) {
    var paramsString = function(obj) {
        var paramString = '';
        for (var key in obj) {
          var value = obj[key] ? obj[key] : '';
          obj[key] instanceof Array && (value = encodeURIComponent(JSON.stringify(value))), '' != paramString && (paramString += '&'), paramString += key + '=' + encodeURIComponent(value);
        }
        return paramString;
      }(data), xmlhttp = new XMLHttpRequest,
      url = _configuration.realtimeMetaData.realtimeGateway.lastIndexOf('/') == _configuration.realtimeMetaData.realtimeGateway.length - 1 ? _configuration.realtimeMetaData.realtimeGateway + event : _configuration.realtimeMetaData.realtimeGateway + '/' + event;
    xmlhttp.open('POST', url, !0), xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8'), xmlhttp.onreadystatechange = function() {
      try {
        if (xmlhttp.readyState != XMLHttpRequest.DONE || 200 != xmlhttp.status) return;
        var responseData = JSON.parse(this.responseText);
        if (responseData.IsSuccess && responseData.Data && responseData.Metadata) {
          responseData.Metadata.delayValue || (responseData.Metadata.delayValue = 0);
          var campaignId = 1;
          responseData.Metadata.campaignDetailId && (campaignId = parseInt(responseData.Metadata.campaignDetailId)), _executionInProcess || (_executionInProcess = !0, setTimeout(function() {
            (function(visitorId, campaignId, recurrenceFrameStopTime, recurrenceLeft) {
              if (!campaignId || void 0 === campaignId || 0 == campaignId) return !1;
              if (null == recurrenceLeft || null == recurrenceFrameStopTime) return !0;
              var minCounter, lsCampaign = localStorage.getItem('optimove_popup_' + campaignId + '_' + visitorId),
                obj = {};
              lsCampaign && (lsCampaign = JSON.parse(lsCampaign), new Date(lsCampaign.recurrenceFrameStopTime) > new Date((new Date).toISOString()) ? minCounter = Math.min(recurrenceLeft, lsCampaign.recurrenceLeft) : (minCounter = recurrenceLeft, obj.recurrenceFrameStopTime = recurrenceFrameStopTime), recurrenceLeft = minCounter);
              return obj.recurrenceFrameStopTime = recurrenceFrameStopTime, obj.recurrenceLeft = recurrenceLeft - 1, localStorage.setItem('optimove_popup_' + campaignId + '_' + visitorId, JSON.stringify(obj)), !(recurrenceLeft <= 0);
            })(data.visitorId, campaignId, responseData.Metadata.recurrenceFrameStopTime, responseData.Metadata.recurrenceLeft) && (_configuration.realtimeMetaData.options.popupCallback ? _configuration.realtimeMetaData.options.popupCallback(responseData) : executePopup(responseData.Data), reportEvent('web_popup_displayed', { campaign_detail_id: campaignId }, function() {
              _executionInProcess = !1;
            }));
          }, 1e3 * responseData.Metadata.delayValue));
        }
        callback && callback();
      } catch (err) {
        logger.log('error', err);
      }
    }, xmlhttp.send(paramsString);
  }, {
    reportEvent: function(event, callback) {
      var params = {};
      for (var eventParam in event.parameters) params[eventParam] = event.parameters[eventParam].value;
      !function(params) {
        try {
          params.event_device_type = getPersistedSDKLocalData(0, eventDeviceTypeIDKey).value, params.event_platform = getPersistedSDKLocalData(0, eventPlatformIDKey).value, params.event_os = getPersistedSDKLocalData(0, eventOSIDKey).value, params.event_native_mobile = getPersistedSDKLocalData(0, eventNativeMobile).value;
        } catch (e) {
          logger.log('info', 'RealtimeModule:extractRealTimeGeneralParams: ' + e.message);
        }
      }(params), callRealtimeAsync('reportEvent', {
        tid: _configuration.realtimeMetaData.realtimeToken,
        cid: _userId,
        eid: event.eventMetadata.id,
        visitorId: event.visitorData ? event.visitorData[1] : null,
        visitCount: event.visitorData ? event.visitorData[3] : null,
        firstVisitorDate: event.visitorData ? event.visitorData[2] : null,
        context: JSON.stringify(params)
      }, callback);
    }, executePopup: executePopup = function(html) {
      try {
        var popupDiv = document.createElement('div'), divHtml = '';
        divHtml = '<div id=\'optiRealPopupDimmer\' style=\'position: fixed;bottom: 0;right: 0;top: 0;left: 0;overflow: hidden;display: none; z-index:999999999;background: #000000;opacity : ' + (_configuration.realtimeMetaData.options.showDimmer ? .5 : 0) + ';display:block;width: auto;height: auto;\'></div>', document.addEventListener('mousedown', closePopup);
        divHtml += '<div style=\'max-height:90%;max-width:90%;top: 50%;left: 50%;transform:translate(-50%, -50%);position: fixed;z-index:9999999999;\'><div style=\' clear:both;min-width: 100px;min-height: 100px;background-color:white; text-align:center;box-shadow:0 0 5px 0 rgba(0, 0, 0, 0.2);\'><div style=\'position:absolute;right:-13px;top:-13px;cursor:pointer;z-index:99999999999; color:white\' onclick=\'optimoveSDK.API.closeRealtimePopup();\'><img id=\'optiRealclosePopupImage\' src=\'https://d3qycynbsy5rsn.cloudfront.net/banner_pop_x.png\' /></div><div>' + html + '</div></div>' + (_configuration.realtimeMetaData.options.showDimmer && _configuration.realtimeMetaData.options.showWatermark ? '<div style=\'position: absolute;z-index:9999999999; clear:both;font-family : Arial;font-size : 9px;color : #CCCCCC;padding-top:6px;margin-left: 5px;\'>Powered by Optimove</div>' : '') + '</div>', popupDiv.innerHTML = divHtml, _popup = popupDiv, document.body.appendChild(popupDiv);
        var scriptTags = popupDiv.getElementsByTagName('script');
        scriptTags.length > 0 && window.eval(scriptTags[0].innerText);
      } catch (err) {
        logger.log('error', 'Error while executing popup', err);
      }
    }, closePopup: closePopup = function(element) {
      element && (!0 !== element && element.target != document.getElementById('optiRealPopupDimmer') && 'optiRealclosePopupImage' != element.target.id || (document.body.removeChild(_popup), document.removeEventListener('mousedown', closePopup)));
    }
  }), optitrackModule = function() {
    var _originalVisitorId = null, _updatedVisitorId = null, _ot_endpoint = null, _ot_tenantId = null, _piwikURL = null,
      _tracker = null, _sdkConfig = null, _logger = null, _pageVisitCount = 0, _previousPageUrl = '',
      LogEventCategory_name = 'LogEvent', logEvent = function(eventId, eventParameters) {
        logOptitrackCustomEvent(this, eventId, eventParameters);
      }, logOptitrackCustomEvent = function(THIS, eventId, event_parameters) {
        try {
          cleanCustomDimensions();
          var eventConfig;
          if (null != (eventConfig = _coreEvents.events.hasOwnProperty(eventId) ? _coreEvents.events[eventId] : _configuration.events[eventId]).parameters && null != event_parameters) {
            var parameterConfigsNames = Object.getOwnPropertyNames(eventConfig.parameters);
            if (parameterConfigsNames.length > _sdkConfig.optitrackMetaData.maxActionCustomDimensions) {
              var errMsg = 'OptiTrackModule:logOptitrackCustomEvent Failed!!, error = numOfConfiguredParameters > maxActionCustomDimensions ';
              throw _logger.log('error', errMsg), new Error(errMsg);
            }
            event_parameters = encodeURLComponents(THIS, eventConfig, event_parameters), parameterConfigsNames.forEach(function(paramName) {
              var currParamConfig = eventConfig.parameters[paramName];
              if (null != event_parameters[paramName] && event_parameters[paramName].length > 255) {
                var errMsg = 'OptiTrackModule:logOptitrackCustomEvent Failed!!, error = paramName=' + paramName + ' in eventId=' + eventId + ' is longer then 255 characters';
                throw _logger.log('error', errMsg), _logger.log('error', 'disabling the event!!'), new Error(errMsg);
              }
              if (null != event_parameters[paramName] && currParamConfig.optiTrackDimensionId > 0) {
                var paramValue = event_parameters[paramName];
                'Boolean' == currParamConfig.type ? paramValue = 1 == paramValue ? 1 : 0 : 'String' == currParamConfig.type && '' == (paramValue = paramValue.trim()) && (paramValue = void 0), null != paramValue && (0, _tracker.setCustomDimension(currParamConfig.optiTrackDimensionId, paramValue));
              }
            });
          }
          if (void 0 !== _tracker) {
            var configEventId = eventConfig.id, eventName = eventId;
            return _tracker.setCustomDimension(_sdkConfig.optitrackMetaData.eventIdCustomDimensionId, configEventId), _tracker.setCustomDimension(_sdkConfig.optitrackMetaData.eventNameCustomDimensionId, eventName), AddCustomEventAdditionalAttributes(THIS, eventId, event_parameters, eventConfig), _tracker.trackEvent(LogEventCategory_name, eventId), !0;
          }
          throw'OptiTrackModule:_tracker is undefined !!';
        } catch (error) {
          errMsg = 'OptiTrackModule:logOptitrackCustomEvent Failed!!, error =  ' + error;
          _logger.log('error', errMsg);
        }
      }, logOptitrackPageVisit = function(THIS, pageURL, pageTitle, category) {
        try {
          null == _tracker && logger.log('error', 'call logOptitrackPageVisit _tracker is undefined'), cleanCustomDimensions(), setPiwikSubDomains(THIS, _tracker), _userId = updateContextUserId(THIS), pageURL = pageURL.toLowerCase(), 1 == _sdkConfig.isSPA && ++_pageVisitCount > 1 && (_tracker.setGenerationTimeMs(0), '' != _previousPageUrl && (_tracker.setReferrerUrl(_previousPageUrl), _previousPageUrl = pageURL)), _tracker.enableLinkTracking(!0), 1 == _sdkConfig.optitrackMetaData.enableHeartBeatTimer && (logger.log('log', 'call logOptitrackPageVisit  enableHeartBeatTimer is activated'), _tracker.enableHeartBeatTimer(_sdkConfig.optitrackMetaData.heartBeatTimer)), _tracker.setCustomUrl(pageURL), void 0 !== pageTitle && null != pageTitle && '' != pageTitle ? _tracker.trackPageView(pageTitle) : (logger.log('info', 'call logOptitrackPageVisit  pageTitle is not defined'), _tracker.trackPageView()), pageURL = _Tools_cleanUrl(pageURL), logEvent('set_page_visit', {
            customURL: _SHA1_SHA1(pageURL),
            pageTitle: pageTitle,
            category: category
          }), void 0 !== category && '' != category ? logPageCategoryEvent(THIS, category) : logger.log('info', 'call logOptitrackPageVisit  category is not defined'), 1 == _sdkConfig.optitrackMetaData.sendUserAgentHeader && logUserAgentHeaderEvent(THIS), 1 == _sdkConfig.supportUserEmailStitch && processEmailStitch(THIS, pageURL);
        } catch (error) {
          var errMsg = 'OptiTrackModule:logOptitrackPageVisit Failed!!, error =  ' + error;
          _logger.log('error', errMsg);
        }
      }, processEmailStitch = function(THIS, pageURL) {
        var stitchData = {}, sourcePCIDParamConfig = null, sourceVisitorIdParamConfig = null,
          targetVsitorIdIdParamConfig = null;
        try {
          var eventConfig = getCustomEventConfigById('stitch_event');
          null != eventConfig && (sourcePCIDParamConfig = getCustomEventParamFromConfig(eventConfig, 'sourcePublicCustomerId'), sourceVisitorIdParamConfig = getCustomEventParamFromConfig(eventConfig, 'sourceVisitorId'), targetVsitorIdIdParamConfig = getCustomEventParamFromConfig(eventConfig, 'targetVsitorId'));
          var pageStitchData = getOptimoveStitchData(pageURL);
          if (0 == pageStitchData.OptimoveStitchDataExist) {
            var browserURL = window.location.pathname, browserStitchData = getOptimoveStitchData(browserURL);
            1 == browserStitchData.OptimoveStitchDataExist && (stitchData = browserStitchData, !0);
          } else stitchData = pageStitchData, !0;
          if (1 == stitchData && void 0 !== _tracker) {
            cleanCustomDimensions();
            _tracker.getVisitorId();
            null != stitchData.OptimovePublicCustomerId ? sourcePCIDParamConfig.optiTrackDimensionId > 0 && (0, _tracker.setCustomDimension(sourcePCIDParamConfig.optiTrackDimensionId, stitchData.OptimovePublicCustomerId)) : sourceVisitorIdParamConfig.optiTrackDimensionId > 0 && (0, _tracker.setCustomDimension(sourceVisitorIdParamConfig.optiTrackDimensionId, stitchData.OptimovePublicCustomerId)), targetVsitorIdIdParamConfig.optiTrackDimensionId > 0 && (0, _tracker.setCustomDimension(targetVsitorIdIdParamConfig.optiTrackDimensionId, stitchData.OptimovePublicCustomerId));
            var configEventId = eventConfig.id;
            _tracker.setCustomDimension(_sdkConfig.optitrackMetaData.eventIdCustomDimensionId, configEventId), _tracker.setCustomDimension(_sdkConfig.optitrackMetaData.eventNameCustomDimensionId, 'stitch_event'), _tracker.trackEvent(LogEventCategory_name, 'stitch_event');
          }
        } catch (error) {
          var errMsg = 'OptiTrackModule:processEmailStitch Failed!!, error =  ' + error;
          _logger.log('error', errMsg);
        }
      }, AddCustomEventAdditionalAttributes = function(THIS, eventId, event_parameters, eventConfig) {
        var currParamConfig = eventConfig.parameters;
        if (currParamConfig && 'object' == typeof currParamConfig && currParamConfig.constructor === Object) {
          var platform = getPersistedSDKLocalData(0, eventPlatformIDKey),
            deviceType = getPersistedSDKLocalData(0, eventDeviceTypeIDKey),
            deviceOS = getPersistedSDKLocalData(0, eventOSIDKey),
            nativeMobile = getPersistedSDKLocalData(0, eventNativeMobile), additionalAttributeValue = void 0;
          if (void 0 === platform) return logger.log('warning', 'AddCustomEventAdditionalAttributes: Additional attributes are not defined!!'), !1;
          try {
            Object.keys(currParamConfig).forEach(function(param_name) {
              if (additionalAttributeValue = void 0, null != currParamConfig[param_name]) {
                var currParam = currParamConfig[param_name];
                if (currParam.id >= 1e3 && currParam.id <= 1100) {
                  switch (param_name) {
                    case'event_platform':
                      eventPlatformIDKey, void 0 !== platform && (additionalAttributeValue = platform.value);
                      break;
                    case'event_device_type':
                      eventDeviceTypeIDKey, void 0 !== deviceType && (additionalAttributeValue = deviceType.value);
                      break;
                    case'event_os':
                      eventOSIDKey, void 0 !== deviceOS && (additionalAttributeValue = deviceOS.value);
                      break;
                    case'event_native_mobile':
                      eventNativeMobile, void 0 !== nativeMobile && (additionalAttributeValue = nativeMobile.value);
                  }
                  null != additionalAttributeValue && _tracker.setCustomDimension(currParamConfig[param_name].optiTrackDimensionId, additionalAttributeValue);
                }
              }
            });
          } catch (error) {
            return logger.log('error', 'parameterValidation failed, currParamConfig object cannot be parsed, object is not legit!!'), !1;
          }
        }
      }, getOptimoveStitchData = function(currURL) {
        var jsonData = { OptimoveStitchDataExist: !1 };
        try {
          var parts = currURL.split('&');
          parts.length > 0 && parts.forEach(function(item, index) {
            if (1 == (item.search('OptimoveStitchFlow') > -1 && 'true' == item.slice('OptimoveStitchFlow'.length + 1))) {
              if (item.search('OptimovePublicCustomerId') > -1) {
                var publicCustomerId = item.slice('OptimovePublicCustomerId'.length + 1);
                jsonData.OptimovePublicCustomerId = publicCustomerId;
              }
              if (item.search('optimoveVisitorId') > -1) {
                var vistorId = item.slice('optimoveVisitorId'.length + 1);
                jsonData.optimoveVisitorId = vistorId;
              }
              jsonData.OptimoveStitchDataExist = !0;
            }
          });
        } catch (error) {
          var errMsg = 'OptiTrackModule:getOptimoveStitchData Failed!!, error =  ' + error;
          _logger.log('error', errMsg);
        }
        return jsonData;
      }, logPageCategoryEvent = function(THIS, category) {
        logOptitrackCustomEvent(THIS, 'page_category_event', { category: category });
      }, logUserAgentHeaderEvent = function(THIS) {
        try {
          if (null != getPersistedSDKSessionData(THIS, '11602c8b76fe7626ca586081b94892e4')) return void _logger.log('info', 'User-Agent Header Already triggered');
          if ('undefined' != typeof navigator && void 0 !== navigator.userAgent) {
            var userAgent1 = navigator.userAgent, userAgent2 = '';
            navigator.userAgent.length > 255 && (userAgent1 = navigator.userAgent.substring(0, 255), userAgent2 = navigator.userAgent.substring(255, navigator.userAgent.length)), logOptitrackCustomEvent(THIS, 'user_agent_header_event', {
              user_agent_header1: userAgent1,
              user_agent_header2: userAgent2
            }), persistSDKSessionData(THIS, '11602c8b76fe7626ca586081b94892e4', !0);
          }
        } catch (error) {
          var errMsg = 'OptiTrackModule:logUserAgentHeaderEvent Failed!!, error =  ' + error;
          _logger.log('error', errMsg);
        }
      }, logOptitrackUserEmail = function(THIS, email) {
        try {
          logOptitrackCustomEvent(THIS, 'set_email_event', { email: email });
        } catch (error) {
          var errMsg = 'OptiTrackModule:logOptitrackUserEmail Failed!!, error =  ' + error;
          _logger.log('error', errMsg);
        }
      }, setOptitrackUserId = function(THIS, updatedUserId) {
        try {
          if (null == _userId || _userId != updatedUserId) {
            var persistedUserId = getPersistedUserId(THIS);
            _originalVisitorId = _tracker.getVisitorId(), _tracker.setUserId(updatedUserId), _updatedVisitorId = _SHA1_SHA1(_userId = updatedUserId).substring(0, 16), void 0 !== _tracker && (null != persistedUserId && persistedUserId == updatedUserId || (logSetUserIdEvent(THIS, _originalVisitorId, updatedUserId, _updatedVisitorId), persistUserId(THIS, updatedUserId)));
          }
          null == _originalVisitorId && (_originalVisitorId = _tracker.getVisitorId(), _userId && (_updatedVisitorId = _SHA1_SHA1(_userId).substring(0, 16)));
        } catch (error) {
          var errMsg = 'OptiTrackModule:setOptitrackUserId Failed!!, error = ' + error;
          _logger.log('error', errMsg);
        }
      }, logSetUserIdEvent = function(THIS, origVisitorIdValue, updatedUserIdValue, updatedVisitorIdValue) {
        try {
          var eventConfig = getCustomEventConfigById('set_user_id_event');
          if (null == origVisitorIdValue || null == updatedUserIdValue) {
            var errMsg = 'OptiTrackModule:logSetUserIdEvent Failed!!, error = origVisitorIdValue == undefined || updatedUserIdValue == undefined ';
            return void _logger.log('error', errMsg);
          }
          if (null != eventConfig) {
            cleanCustomDimensions();
            var originalVisitorIdConfig = getCustomEventParamFromConfig(eventConfig, 'originalVisitorId'),
              updatedVisitorIdConfig = getCustomEventParamFromConfig(eventConfig, 'updatedVisitorId'),
              userIdParamConfig = getCustomEventParamFromConfig(eventConfig, 'userId'), eventId = eventConfig.id;
            if (_tracker.setCustomDimension(_sdkConfig.optitrackMetaData.eventIdCustomDimensionId, eventId), _tracker.setCustomDimension(_sdkConfig.optitrackMetaData.eventNameCustomDimensionId, 'set_user_id_event'), null != userIdParamConfig) {
              var encodedUserIdValue = encodeURIComponent(updatedUserIdValue);
              _tracker.setCustomDimension(userIdParamConfig.optiTrackDimensionId, encodedUserIdValue);
            }
            null != originalVisitorIdConfig && _tracker.setCustomDimension(originalVisitorIdConfig.optiTrackDimensionId, origVisitorIdValue), null != updatedVisitorIdConfig && _tracker.setCustomDimension(updatedVisitorIdConfig.optiTrackDimensionId, updatedVisitorIdValue), AddCustomEventAdditionalAttributes(THIS, eventId, {
              originalVisitorId: origVisitorIdValue,
              userId: updatedUserIdValue,
              updatedVisitorId: updatedVisitorIdValue
            }, eventConfig), _tracker.trackEvent(LogEventCategory_name, 'set_user_id_event');
          }
        } catch (error) {
          errMsg = 'OptiTrackModule:logSetUserIdEvent Failed!!, error =  ' + error;
          _logger.log('error', errMsg);
        }
      }, getCustomEventConfigById = function(eventId) {
        var currEvent = _sdkConfig.events[eventId];
        return null == currEvent ? null : currEvent;
      }, getCustomEventParamFromConfig = function(eventConfig, paramName) {
        var currParam = eventConfig.parameters[paramName];
        return null == currParam ? null : currParam;
      }, encodeURLComponents = function(THIS, eventConfig, event_parameters) {
        if (null != eventConfig.parameters) return Object.keys(event_parameters).forEach(function(paramName) {
          var currParam = eventConfig.parameters[paramName];
          if (null != currParam && 'Number' != currParam.type && 'Boolean' != currParam.type) {
            var paramValue = event_parameters[paramName];
            paramValue = encodeURIComponent(paramValue), event_parameters[paramName] = paramValue.trim();
          }
        }), event_parameters;
        _logger.log('info', 'Events Parameters is null !');
      }, setPiwikSubDomains = function(THIS, tracker) {
        if (null != tracker) {
          var domain = getDomain();
          tracker.setCookieDomain(domain), tracker.setDomains(domain);
        }
      }, getDomain = function() {
        var hostname = window.location.hostname, splitArray = hostname.split('.'), result = '';
        if (splitArray.length >= 3) {
          var postfix = splitArray[splitArray.length - 1];
          result = splitArray[splitArray.length - 2] + '.' + postfix;
        } else 2 == splitArray.length && (result = hostname);
        return result;
      }, updateContextUserId = function(THIS) {
        return null == _userId && (THIS._optiTrackUserId = getPersistedUserId(THIS), void 0 !== _tracker && null != THIS._optiTrackUserId) ? (_tracker.setUserId(THIS._optiTrackUserId), THIS._optiTrackUserId) : _userId;
      }, persistSDKSessionData = function(THIS, key, updatedValue) {
        try {
          if (1 == _sdkConfig.optitrackMetaData.useSessionStorage) {
            var currValue = sessionStorage.getItem(key);
            null != currValue && currValue == updatedValue || sessionStorage.setItem(key, updatedValue);
          } else _logger.log('info', 'Optitrack: persistSDKSessionData()  Not  Persisted');
        } catch (error) {
          var errMsg = 'OptiTrackModule: persistSDKSessionData ()  Failed error = ' + error;
          _logger.log('error', errMsg);
        }
      }, getPersistedSDKSessionData = function(THIS, key) {
        try {
          if (1 != _sdkConfig.optitrackMetaData.useSessionStorage) return _logger.log('info', 'Optitrack: persistSDKSessionData()  key:' + key + ' Not Persisted'), null;
          var value = sessionStorage.getItem(key);
          if (null != value) return { key: key, value: value };
        } catch (error) {
          var errMsg = 'OptiTrackModule: getPersistedSDKSessionData ()  Failed error = ' + error;
          return _logger.log('error', errMsg), null;
        }
      }, persistUserId = function(THIS, updatedUserId) {
        persistSDKSessionData(THIS, '215d26f4be2047f348066e44ee7fe3d6', updatedUserId);
      }, getPersistedUserId = function(THIS) {
        var clientCustomerIDKeyValue = getPersistedSDKSessionData(THIS, '215d26f4be2047f348066e44ee7fe3d6');
        if (null != clientCustomerIDKeyValue) return clientCustomerIDKeyValue.value;
      }, loadOptiTrackJSResource = function(THIS, resourceURL, callback) {
        if (null != resourceURL) {
          var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
          g.type = 'text/javascript', g.async = !0, g.defer = !0, g.src = resourceURL, g.readyState ? g.onreadystatechange = function() {
            'loaded' != g.readyState && 'complete' != g.readyState || (g.onreadystatechange = null, handleTrackerLoadedCB(THIS, callback));
          } : g.onload = function() {
            handleTrackerLoadedCB(THIS, callback);
          }, s.parentNode.insertBefore(g, s);
        }
      }, handleTrackerLoadedCB = function(THIS, callback) {
        _tracker = createOptitrackTracker(), handleInitializationFinished(THIS, _tracker, callback);
      }, handleInitializationFinished = function(THIS, tracker, callback) {
        null == tracker ? (_logger.log('error', 'Tracker Creation failed!!'), callback(!1)) : callback(!0);
      }, createOptitrackTracker = function() {
        if (void 0 !== self.Piwik) {
          var trackerURL = _ot_endpoint + 'piwik.php', tracker = self.Piwik.getAsyncTracker(trackerURL, _ot_tenantId);
          return void 0 === tracker && (_logger.log('info', 'Tracker Creation failed!!, trying to add Tracker'), void 0 !== (tracker = self.Piwik.addTracker(trackerURL, _ot_tenantId)) ? _logger.log('info', 'Tracker Creation Succeeded') : _logger.log('error', 'Tracker Creation Failed')), tracker;
        }
      }, getOptiTrackEndpointFromConfig = function(SDKConfig) {
        return SDKConfig.optitrackMetaData.optitrackEndpoint;
      }, getOptiTrackTenantIdFromConfig = function(SDKConfig) {
        return SDKConfig.optitrackMetaData.siteId;
      }, buildPiwikResourceURL = function(SDKConfig) {
        return '//sdk-cdn.optimove.net/websdk/piwik.js';
      }, cleanCustomDimensions = function() {
        for (var customDimensionId = _sdkConfig.optitrackMetaData.actionCustomDimensionsStartId - 2, maxActionCustomDimensionsId = _sdkConfig.optitrackMetaData.actionCustomDimensionsStartId + _sdkConfig.optitrackMetaData.maxActionCustomDimensions; customDimensionId <= maxActionCustomDimensionsId; customDimensionId++) _tracker.deleteCustomDimension(customDimensionId);
      };
    return {
      initializeOptiTrack: function(logger, SDKConfig, callback_ready) {
        _logger = logger, LogEventCategory_name = (_sdkConfig = SDKConfig).optitrackMetaData.eventCategoryName, _ot_endpoint = getOptiTrackEndpointFromConfig(SDKConfig), _ot_tenantId = getOptiTrackTenantIdFromConfig(SDKConfig), _piwikURL = buildPiwikResourceURL(SDKConfig);
        loadOptiTrackJSResource(this, _piwikURL, callback_ready);
      }, setUserId: function(updatedUserId) {
        setOptitrackUserId(this, updatedUserId);
      }, logUserEmail: function(email) {
        logOptitrackUserEmail(this, email);
      }, logEvent: logEvent, logPageVisitEvent: function(customURL, pageTitle, category) {
        logOptitrackPageVisit(this, customURL, pageTitle, category);
      }, logMetadataCoreEvent: function(THIS) {
        _logger.log('info', 'OptiTrackModule: in logMetadataCoreEvent');
        var isReported = getPersistedSDKSessionData(THIS, 'a5c127e180652c82e615be143677e248');
        if (!isReported || 'true' !== isReported.value) {
          var params = {
            sdk_platform: 'Web',
            sdk_version: '1.0.7.13',
            config_file_url: _configFileUrl,
            app_ns: _hostname
          };
          try {
            logEvent('optimove_sdk_metadata', params), persistSDKSessionData(THIS, 'a5c127e180652c82e615be143677e248', !0);
          } catch (error) {
            var errMsg = 'OptiTrackModule:logMetadataCoreEvent Failed!!, error =  ' + error;
            _logger.log('warning', errMsg);
          }
        }
      }, getOptitrackVisitorInfo: function(THIS) {
        var visitorInfo = [];
        try {
          if (void 0 === _tracker) throw'tracker is not defined';
          visitorInfo = _tracker.getVisitorInfo();
        } catch (error) {
          var errMsg = 'OptiTrackModule: getOptitrackVisitorInfo ' + error;
          _logger.log('error', errMsg);
        }
        return visitorInfo;
      }, getOptitrackUserInfo: function(THIS) {
        try {
          return { userId: _userId, originalVisitorId: _originalVisitorId, updatedVisitorId: _updatedVisitorId };
        } catch (error) {
          var errMsg = 'OptiTrackModule:getOptitrackUserInfo  Failed!!, error = ' + error;
          _logger.log('error', errMsg);
        }
      }, getUserId: getPersistedUserId, getKeyId: function(THIS, keyName) {
        try {
          var resultKeyId = null;
          switch (keyName) {
            case'datonics':
              resultKeyId = '75f8c5fdab43daca991a35c854a5a6d2';
              break;
            case'liveRamp':
              resultKeyId = '4007d0a432ab6289711974163b25a06d';
              break;
            case'googlCookieMatch':
              resultKeyId = '634beb77779dc8025e7615cf95fce8f7';
              break;
            default:
              resultKeyId = null;
          }
          return resultKeyId;
        } catch (error) {
          var errMsg = 'OptiTrackModule:getKeyId  Failed!!, error = ' + error;
          _logger.log('error', errMsg);
        }
      }, getPersistedSDKSessionData: getPersistedSDKSessionData, persistSDKSessionData: persistSDKSessionData
    };
  }(), liveRampModule = {
    updateLiveRampDataMatching: function() {
      var visitorId, livRampId = optitrackModule.getKeyId(optitrackModule, 'liveRamp'),
        liveRampOnSessionPersisted = optitrackModule.getPersistedSDKSessionData(optitrackModule, livRampId);
      if (visitorId = getVisitorsInfoObj().visitorId, (null == liveRampOnSessionPersisted || liveRampOnSessionPersisted.value != visitorId) && void 0 !== _configuration.LiveRampMetaData && void 0 !== _configuration.LiveRampMetaData.tenantToken && void 0 !== _configuration.LiveRampMetaData.baseEndpoint) {
        var tenantToken = _configuration.LiveRampMetaData.tenantToken,
          liveRampTenantToken = _configuration.LiveRampMetaData.liveRampTenantToken,
          liveRampTemplateEndpoint = _configuration.LiveRampMetaData.baseEndpoint,
          tenantId = _configuration.optitrackMetaData.siteId, reg = new RegExp('(\\[liveRampToken\\])', 'g');
        !function(srcUrl) {
          if (tenantToken != srcUrl) {
            var d = document, g = d.createElement('img'), s = d.getElementsByTagName('script')[0];
            g.type = 'text/javascript', g.async = !0, g.defer = !0, g.src = srcUrl, s.parentNode.insertBefore(g, s);
          }
        }(liveRampTemplateEndpoint.replace(reg, liveRampTenantToken) + tenantToken + '_' + tenantId + '_' + visitorId), optitrackModule.persistSDKSessionData(optitrackModule, livRampId, visitorId);
      }
    }
  }, datonicsModule = {
    updateDatonicsDataMatching: function() {
      var visitorId, datonicsId = optitrackModule.getKeyId(optitrackModule, 'datonics'),
        datonicsOnSessionPersisted = optitrackModule.getPersistedSDKSessionData(optitrackModule, datonicsId);
      visitorId = getVisitorsInfoObj().visitorId, (null == datonicsOnSessionPersisted || datonicsOnSessionPersisted.value != visitorId) && (function(optimove_Cookie_ID, optimove_Client_ID) {
        if (null != optimove_Cookie_ID) {
          var baseEndpoint = _configuration.DatonicsCookieMatchingMetaData.baseEndpoint, d = document,
            g = d.createElement('img'), s = d.getElementsByTagName('script')[0];
          g.type = 'text/javascript', g.async = !0, g.defer = !0;
          var random = Math.round(1e16 * Math.random());
          g.src = baseEndpoint + 'csync=' + optimove_Client_ID + '_' + optimove_Cookie_ID + ';rnd=(' + random + ')', s.parentNode.insertBefore(g, s);
        }
      }(visitorId, _configuration.optitrackMetaData.siteId), optitrackModule.persistSDKSessionData(optitrackModule, datonicsId, visitorId));
    }
  }, cookieMatcherModule = {
    updateCookieMatcher: function(userId) {
      var visitorId, googlCookieMatchId = optitrackModule.getKeyId(optitrackModule, 'googlCookieMatch'),
        googlCookieMatchOnSessionPersisted = optitrackModule.getPersistedSDKSessionData(optitrackModule, googlCookieMatchId);
      visitorId = getVisitorsInfoObj().visitorId;
      var cookieMatcherUserId = null;
      cookieMatcherUserId = void 0 !== userId && null != userId ? userId : visitorId, (null == googlCookieMatchOnSessionPersisted || googlCookieMatchOnSessionPersisted.value != visitorId) && (function(cookieMatcherUserId) {
        var setCookieUrl = 'https://gcm.optimove.events/setCookie?optimove_id=' + cookieMatcherUserId,
          setCookieNode = document.createElement('img');
        setCookieNode.style.display = 'none', setCookieNode.setAttribute('src', setCookieUrl), document.body.appendChild(setCookieNode);
      }(cookieMatcherUserId), function(tenantToken, optimoveCookieMatcherId) {
        var url = 'https://cm.g.doubleclick.net/pixel?google_nid=' + optimoveCookieMatcherId + '&google_cm&tenant_id=' + tenantToken,
          node = document.createElement('img');
        node.style.display = 'none', node.setAttribute('src', url), document.body.appendChild(node);
      }(_configuration.cookieMatcherMetaData.tenantToken, _configuration.cookieMatcherMetaData.optimoveCookieMatcherId), optitrackModule.persistSDKSessionData(optitrackModule, googlCookieMatchId, visitorId));
    }
  }, _API = {
    getVersion: function() {
      return '1.0.7.13';
    },
    getConfigurationVersion: function() {
      return _configuration.version;
    },
    getVisitorId: function() {
      if (void 0 !== optitrackModule) {
        var visitorInfo = optitrackModule.getOptitrackVisitorInfo(optitrackModule);
        if (void 0 !== visitorInfo && void 0 !== visitorInfo[1]) return visitorInfo[1];
      }
    },
    setRealTimeOptions: function(options) {
      null != options.showDimmer && (_configuration.realtimeMetaData.options.showDimmer = options.showDimmer), null != options.showWatermark && (_configuration.realtimeMetaData.options.showWatermark = options.showWatermark), null != options.reportEventCallback && (_configuration.realtimeMetaData.options.popupCallback = options.reportEventCallback);
    },
    setUserId: function(updatedUserId, callback) {
      var userId = updatedUserId.trim();
      if (_Tools_validateUserId(userId)) {
        if (_configuration.enableOptitrack && (logger.log('info', 'call setUserId Optitrack'), optitrackModule.setUserId(userId), _configuration.enableRealtime)) {
          var userInfo = optitrackModule.getOptitrackUserInfo(),
            rtEvent = eventValidation.validateEvent('set_user_id_event', userInfo);
          reportEventRealtime(rtEvent, callback);
        }
        1 == _configuration.supportCookieMatcher && cookieMatcherModule.updateCookieMatcher(_userId);
      } else logger.log('error', 'setUserId: userId ' + userId + ' is not valid');
    },
    setUserEmail: function(email, callback) {
      if (_userEmail = email.trim(), _configuration.enableOptitrack) try {
        logger.log('info', 'call setUserEmail Optitrack'), optitrackModule.logUserEmail(_userEmail);
      } catch (err) {
        logger.log('error', err);
      }
      if (_configuration.enableRealtime) {
        var event = eventValidation.validateEvent('set_email_event', { email: _userEmail });
        reportEventRealtime(event, callback);
      }
    },
    registerUser: function(updatedUserId, email, eventName, parameters) {
      var userId = updatedUserId.trim();
      _Tools_validateUserId(userId) ? _configuration.enableRealtime ? userId && _API.setUserId(userId, function() {
        email && _API.setUserEmail(email, function() {
          eventName && _API.reportEvent(eventName, parameters);
        });
      }) : (userId && _API.setUserId(userId), email && _API.setUserEmail(email), eventName && _API.reportEvent(eventName, parameters)) : logger.log('error', 'registerUser: userId ' + userId + ' is not valid');
    },
    reportEvent: reportEvent,
    setPageVisit: function(customURLIn, pageTitleIn, categoryIn) {
      var pageTitle = pageTitleIn.trim(), category = null != categoryIn ? categoryIn.trim() : null,
        customURL = encodeURI(customURLIn);
      if (_Tools_validatePageURL(customURL)) {
        if (customURL = customURL.trim().toLowerCase(), _configuration.enableOptitrack && (logger.log('info', 'call setPageVisit Optitrack'), optitrackModule.logPageVisitEvent(customURL, pageTitle, category)), void 0 !== _configuration.supportDatonicsCookieMatching && 1 == _configuration.supportDatonicsCookieMatching && (logger.log('info', 'call setPageVisit support DatonicsCookieMatching'), datonicsModule.updateDatonicsDataMatching()), void 0 !== _configuration.supportCookieMatcher && 1 == _configuration.supportCookieMatcher && null == _userId && cookieMatcherModule.updateCookieMatcher(null), void 0 !== _configuration.supportLiveRamp && 1 == _configuration.supportLiveRamp && liveRampModule.updateLiveRampDataMatching(), _configuration.enableRealtime) {
          logger.log('info', 'call setPageVisit Realtime'), customURL = _Tools_cleanUrl(customURL);
          var event = eventValidation.validateEvent('set_page_visit', {
            customURL: customURL,
            pageTitle: pageTitle,
            category: category
          });
          event ? reportEventRealtime(event) : logger.log('info', 'set_page_visit validation failed');
        }
      } else logger.log('error', 'setPageVisit: URL \'' + customURL + '\' is not valid');
    },
    showRealtimePopup: realTimeModule.executePopup,
    closeRealtimePopup: realTimeModule.closePopup,
    openWebTestTool: function(url = null) {
      var lol = document.getElementById('optimoveSdkWebTool'), toolPath = url || '//sdk-cdn.optimove.net/webtool/prod/';
      null == lol && loadScript(toolPath + 'optmv-web-test-tool.js', function() {
        openTestTool(toolPath);
      });
    },
    closeWebTestTool: function() {
      var a = document.getElementById('optimoveSdkWebTool');
      null != a && (a.remove(), window.sessionStorage.setItem('isSideBarShouldBeOpen', !1)), document.body.classList.remove('optimoveSdkWebToolOpen'), document.body.style.width = 'auto';
    }
  };
  return {
    initialize: function(token, confversion, callback, logLevel) {
      logLevel && logger.setLevel(logLevel), _hostname = window.location.hostname, loadScript(_configFileUrl = _sdkDomain + 'webconfig/' + token + '/' + confversion + '.js', function() {
        logger.log('info', 'configuration loaded successfully'), loadScript('//sdk-cdn.optimove.net/webconfig/prod/sdk-events.js', function() {
          _coreEvents = self.optimoveCoreEvents, logger.log('info', _coreEvents), logger.log('info', 'core events loaded successfully'), setConfiguration(function() {
            callback(), optitrackModule.logMetadataCoreEvent();
          });
        });
      });
    }, API: _API
  };
}(), optmvIsOpen = function() {
  return 'true' == window.sessionStorage.getItem('isSideBarShouldBeOpen');
};
optmvIsOpen() && optimoveSDK.API.openWebTestTool();
