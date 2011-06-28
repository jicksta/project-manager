Date.prototype.getWeek = function() {
    var tmpDate = new Date();
    tmpDate.setFullYear(this.getFullYear(), this.getMonth(), this.getDate());
    var D = tmpDate.getDay();
    if(D == 0) D = 7;
    tmpDate.setDate(tmpDate.getDate() + (4 - D));
    var YN = tmpDate.getFullYear();
    var ZBDoCY = Math.floor((tmpDate.getTime() - new Date(YN, 0, 1, -6)) / 86400000);
    var WN = 1 + Math.floor(ZBDoCY / 7);
    return WN;
};