var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
function getExchangeRate(currency) {
    return __awaiter(this, void 0, void 0, function () {
        var url, xhr, data, rows, row, regex, match, rate;
        return __generator(this, function (_a) {
            url = "https://eximin.net/rates.aspx?type=custom";
            try {
                xhr = new XMLHttpRequest();
                xhr.open("GET", url, false); // Synchronous request
                xhr.send();
                if (xhr.status === 200) {
                    data = xhr.responseText;
                    rows = data.split("<tr>");
                    row = rows.find(function (row) { return row.includes("<strong>".concat(currency, "</strong>")); });
                    if (row) {
                        regex = /<td>\s*(\d+\.\d+)\s*<\/td>\s*<td>\s*(\d+\.\d+)\s*<\/td>/;
                        match = regex.exec(row);
                        if (match && match.length >= 3) {
                            rate = parseFloat(match[2]);
                            return [2 /*return*/, { currency: currency === "Euro" ? "EUR" : "USD", rate: rate }];
                        }
                    }
                }
                else {
                    throw new Error("Failed to fetch exchange rate. Status: ".concat(xhr.status));
                }
            }
            catch (error) {
                console.error("Error fetching exchange rate:", error);
            }
            return [2 /*return*/, null];
        });
    });
}
// Example usage
(function () { return __awaiter(_this, void 0, void 0, function () {
    var euroRate, usdRate, exchangeRates;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getExchangeRate("Euro")];
            case 1:
                euroRate = _a.sent();
                return [4 /*yield*/, getExchangeRate("U. S. Dollar")];
            case 2:
                usdRate = _a.sent();
                exchangeRates = [];
                if (euroRate) {
                    exchangeRates.push(euroRate);
                }
                else {
                    console.log("Euro export rate not found");
                }
                if (usdRate) {
                    exchangeRates.push(usdRate);
                }
                else {
                    console.log("USD export rate not found");
                }
                console.log(JSON.stringify(exchangeRates));
                return [2 /*return*/];
        }
    });
}); })();
