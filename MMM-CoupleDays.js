Module.register("MMM-CoupleDays", {
  defaults: {
    name1: "Partner 1",
    name2: "Partner 2",
    date: "2023-01-01",
    extraDates: [{label: "Since first event", date: "2023-01-02"}, {label: "Since second event", date: "2023-01-03"}],
    showExtraDates: false,
    ExtraDatesViewMode: "loop",
    vectorImgUrl: "",
    showVectorImg: false,
    landscapeMode: false,
    transitionDuration: 7500,
    language: "en",
    textColor: "white"
  },

  start () {
    this.currentIndex = 0;
    this.views = [
      {key: "days", label: this.translate("days")},
      {key: "weeks", label: this.translate("weeks")},
      {key: "months", label: this.translate("months")},
      {key: "years", label: this.translate("years")},
      {key: "total", label: this.translate("total")}
    ];
    this.currentView = this.views[this.currentIndex];
    this.startDate = moment(this.config.date);
    this.endDate = moment();
    this.headerWrapper = document.createElement("div");
    this.headerWrapper.className = "couple-days-header";
    this.wrapper = document.createElement("div");
    this.wrapper.className = "couple-days-wrapper";
    this.wrapper.style.color = this.config.textColor;
    this.wrapper.appendChild(this.headerWrapper);

    if (this.config.showVectorImg) {
      this.imageContentWrapper = document.createElement("div");
      this.imageContentWrapper.className = "couple-days-image";

      const img = document.createElement("img");
      img.src = this.config.vectorImgUrl || "/modules/MMM-CoupleDays/assets/default/default-asset.png";
      img.alt = "Couple Image";
      img.className = "couple-image";
      this.imageContentWrapper.appendChild(img);

      if (this.config.landscapeMode) {
        this.wrapper.style.display = "flex";
        this.wrapper.style.alignItems = "center";
        this.wrapper.appendChild(this.imageContentWrapper);
      } else {
        this.imageContentWrapper.style.display = "inline";
        this.wrapper.appendChild(this.imageContentWrapper);
      }
    }


    this.contentWrapper = document.createElement("div");
    this.contentWrapper.className = "couple-days-content";
    this.wrapper.appendChild(this.contentWrapper);


    if (this.config.showExtraDates && this.config.extraDates.length > 0) {
      this.extraContentWrapper = document.createElement("div");
      this.extraContentWrapper.className = "couple-days-extra-content";
      this.wrapper.appendChild(this.extraContentWrapper);
      this.updateExtraContent();
    }


    this.updateContent();
    this.updateDom();

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.views.length;
      this.currentView = this.views[this.currentIndex];
      this.updateContent();
      if (this.config.showExtraDates && this.config.extraDates.length > 0) {
        this.updateExtraContent();
      }
    }, this.config.transitionDuration);
  },

  getStyles () {
    return ["MMM-CoupleDays.css"];
  },

  getScripts () {
    return ["moment.js"];
  },

  getTranslations () {
    return {
      [this.config.language]: `translations/${this.config.language}.json`
    };
  },


  getHeader () {
    if (this.config.name2 === "") {
      return this.config.name1;
    }
    return `${this.config.name1} ${this.translate("and")} ${this.config.name2}`;
  },

  getDuration (unit, startDate = this.startDate) {
    return this.endDate.diff(startDate, unit);
  },

  formatDuration (duration, unit) {
    const translationKey = duration === 1
      ? unit.slice(0, -1)
      : unit; // Entfernt das letzte Zeichen für Singularformen
    return `${duration} ${this.translate(translationKey)}`;
  },


  updateContent () {
    this.contentWrapper.innerHTML = this.getFormattedDuration();
  },

  updateExtraContent () {
    this.extraContentWrapper.innerHTML = this.getExtraFormattedDuration();
  },

  getFormattedDuration () {
    switch (this.currentView.key) {
      case "days":
        return this.formatDuration(this.getDuration("days"), "days");
      case "weeks":
        return this.formatDuration(this.getDuration("weeks"), "weeks");
      case "months":
        return this.formatDuration(this.getDuration("months"), "months");
      case "years":
        return this.formatYears();
      case "total":
        return this.formatTotal();
    }
  },

  getExtraFormattedDuration () {
    let view = "";

    let viewIndex = this.currentView.key;
    if (this.config.ExtraDatesViewMode && this.config.ExtraDatesViewMode !== "loop") {
      viewIndex = this.config.ExtraDatesViewMode;
    }

    this.config.extraDates.forEach((extraDate) => {
      let formatDuration = "";

      if (viewIndex === "years") {
        formatDuration = this.formatYears(moment(extraDate.date));
      } else if (viewIndex === "total") {
        formatDuration = this.formatTotal(moment(extraDate.date));
      } else {
        formatDuration = this.formatDuration(this.getDuration(viewIndex, moment(extraDate.date)), viewIndex);
      }

      view += `
        <div class="extra-content-main">
          ${formatDuration}
          <div class="extra-label">${` ${extraDate.label}`}</div>
        </div>
      `;
    });

    return view;
  },


  formatYears (startDate) {
    const years = Math.floor(this.getDuration("years"), startDate);
    const months = Math.floor(this.getDuration("months", startDate) % 12);

    // Berechne die tatsächliche Anzahl der Tage korrekt
    const totalDays = this.getDuration("days", startDate);
    const yearMonthDays = years * 365 + months * 30;
    const days = totalDays - yearMonthDays;
    if (years === 0) {
      return `${this.formatDuration(months, this.translate("months"))} ${this.formatDuration(days, this.translate("days"))}`;
    }
    let formattedYears = this.formatDuration(years, this.currentView.label);
    if (years === 1) {
      formattedYears = `${years} ${this.translate("year")}`;
    } else {
      formattedYears = `${years} ${this.translate("years")}`;
    }
    return formattedYears;
  },

  formatTotal (startDate) {
    const years = Math.floor(this.getDuration("years", startDate));
    const months = Math.floor(this.getDuration("months", startDate) % 12);

    // Berechne die tatsächliche Anzahl der Tage korrekt
    const totalDays = this.getDuration("days", startDate);
    const yearMonthDays = years * 365 + months * 30;
    const days = totalDays - yearMonthDays;
    const formattedYears = this.formatDuration(years, this.translate("years"));
    const formattedMonths = this.formatDuration(months, this.translate("months"));
    const formattedDays = this.formatDuration(days, this.translate("days"));
    const andTranslation = this.translate("and");
    if (years === 0) {
      return `${formattedMonths} ${andTranslation} ${formattedDays}`;
    }
    return `${formattedYears}  ${formattedMonths} ${andTranslation} ${formattedDays}`;
  },

  getDom () {
    return this.wrapper;
  }
});
