(() => {
  const overlayUrl = "https://c-j-buckley.github.io/Tough-Mudder/tough-mudder-overlay/tough-mudder-operator-overlay.html";
  const overlayOrigin = new URL(overlayUrl).origin;
  const apiUrl = "https://robohub.apps.openai.org/api/collection_ops/shift?location=lion";
  const wrapperId = "tough-mudder-dashboard-overlay";
  const existing = document.getElementById(wrapperId);

  if (existing) {
    existing.remove();
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.id = wrapperId;
  Object.assign(wrapper.style, {
    position: "fixed",
    inset: "0",
    zIndex: "2147483647",
    pointerEvents: "none"
  });

  const frame = document.createElement("iframe");
  frame.src = overlayUrl;
  frame.title = "Tough Mudder Operator Overlay";
  frame.allow = "fullscreen";
  Object.assign(frame.style, {
    position: "absolute",
    inset: "0",
    width: "100vw",
    height: "100vh",
    border: "0",
    background: "transparent",
    pointerEvents: "none"
  });

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.textContent = "Hide Tough Mudder Overlay";
  Object.assign(closeButton.style, {
    position: "fixed",
    right: "12px",
    bottom: "12px",
    zIndex: "2147483647",
    border: "1px solid #ffd476",
    borderRadius: "4px",
    padding: "8px 10px",
    color: "#fff2c9",
    background: "rgba(22, 13, 8, .92)",
    boxShadow: "3px 3px 0 rgba(0, 0, 0, .72)",
    font: "700 12px Courier New, monospace",
    pointerEvents: "auto",
    cursor: "pointer"
  });
  closeButton.addEventListener("click", () => wrapper.remove());

  wrapper.append(frame, closeButton);
  document.documentElement.appendChild(wrapper);

  const LOCKER_HASHES = [
    [1, "b14cea5f36a795fdcbbe5b086cf6eea0a7ecea9e6461ff60bf31cc966f873f6c"],
    [2, "840d353425711be27c44442bac646cb4f6f604257b3d915bc63380ee47957bdb"],
    [3, "411fe4f44f56e2b1038176e80cf0500af3b7bb911ee0c2d4d32faab9fce612da"],
    [4, "5133abc9011ed54a70440102e6d53db4bb258608872a51db833ba49ba0b0a376"],
    [5, "bde492e15d96ea1cb94b24ab7477979d65300fd751f650e808f43e9dca6c6bf5"],
    [6, "6a22136db46b9b8744bcaae7b761e04ea1c1b2ed200fa6e0c2e304edb21c2306"],
    [7, "197f58d5c0117e88b26c15982fecf04a729647ac60b9a165ff0162e5cd479447"],
    [8, "10f58e86448f8aa3f5708a1e573a2825ac25274c4ca8594016b2611615d8919a"],
    [9, "77cf9a4e4d8e312d56f56575f2d425dbd8a59145e6dc13b0643b8fdbc0e83590"],
    [10, "c8f8bb95b6b3ae1cdce6d5ff52a5e360233ffbbb272d048f4141c30030ee740b"],
    [11, "4e51e40f84ba893f6436f12b5857cd0db79fdc69576156cc025386510785d630"],
    [12, "995a33f3b1cadcc98dcfb95cddad1d6f03addf1a07964a459bb0f88a0813e250"],
    [13, "53019740f9689e75ed3f647ca4eabdaf6a4e5eb1f4e9e5df386076201e5c1437"],
    [14, "20bd30ad45cc7bd00a80f3d66304158b3e1ab4431167b77f3044c9229db298c3"],
    [15, "fefd30bd02c9240ea6c14092fb70b3e266cded32688102b810dff7b874c35901"],
    [16, "4035f3bc53839a1b04b1e200788deb7eed6eb19beafbb29efaf9bcb9a36d8730"],
    [18, "74b9b1246f21a0c5e1e1cf155b11682ebecf246928e5ffb028d7445921c0a5e9"],
    [19, "3437665303efdc8483e82a4790c8413ce2e531b715414ca99830e12a5714f9bc"],
    [20, "adcb0251a054d2eebe976a7249a2bf46dfc25daef1b13c2194ce8ce616d6ee23"],
    [21, "2c2cbcaa31849bc25faa8b4aee5756ea15c29f9b0efca3b91164b8a559cc3b8e"],
    [22, "4e51e40f84ba893f6436f12b5857cd0db79fdc69576156cc025386510785d630"],
    [23, "71ffcd7d30c7deb9ef73c956f2c1b9e81abd5c024a3e1cf5ce863356fbb4028e"],
    [24, "8e0099f83e08329530a4ec07bf178eb644d0a48ee3e9ca8f5dc36d84df58e0b5"],
    [25, "306d536d339d69b3e8a27924a8df91c557a62195bf785da2c58fb6074d3f6293"],
    [26, "5fce0bc31bfdba69b8cc95bd712324fe9f195e5e54572a5aa0448fed9c8b1b4e"],
    [27, "6c43f8ab79a19392e0006e93d829afe40714f8b6b4ae4707b452c486468af872"],
    [28, "a3d3aa88cce2a8be8f0e304e21270c17e887497051961bf668657e77f8ab14c5"],
    [29, "4e81bd76d3ef693d4784b8eb3b0cee63e8db44bd082a56aec9dc9304d0fe20f7"],
    [30, "283ae0ed9e6d160069a5afa261d5d7b539c6cc25df512b271a222beea0a51fab"],
    [31, "f730df223f7234004ff784dc730b1bdf8438d50288424d2bca51fdb3d7a79c57"],
    [32, "4af42be74fae5a4d84a7db1e45790d6eaa108505a104db76ba40390a8f14f821"],
    [33, "faf9c796c6552a5f19119dacd0b31a69f5caf0550037bf66b7fc51e65d4ad622"],
    [35, "f729e547299bf8eadaed32a155f5d6de36caf9479e08893febac1569da8f35b5"],
    [36, "97bf2a91e55c761431f202faa43ab8e7a883c92ff38ee5072c27e8364c8dbdd5"]
  ];

  const HASH_LOOKUP = LOCKER_HASHES.reduce((lookup, [locker, hash]) => {
    lookup[hash] ||= [];
    lookup[hash].push(locker);
    return lookup;
  }, {});

  const num = value => Number.parseFloat(value) || 0;

  function normalizeName(value) {
    return String(value ?? "").trim().replace(/\s+/g, " ").toLowerCase();
  }

  async function sha256(value) {
    const bytes = new TextEncoder().encode(normalizeName(value));
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, "0")).join("");
  }

  async function lockerForName(name, seenCounts) {
    const hash = await sha256(name);
    const lockers = HASH_LOOKUP[hash];
    if (!lockers?.length) return null;
    const index = seenCounts[hash] || 0;
    seenCounts[hash] = index + 1;
    return lockers[Math.min(index, lockers.length - 1)];
  }

  function parseMetricValue(value) {
    if (value === undefined || value === null || value === "") return null;
    if (typeof value === "number") return Number.isFinite(value) ? value : null;
    if (typeof value === "object") {
      return firstMetric(value, ["value", "Value", "hours", "Hours", "time", "Time", "duration", "Duration", "total", "Total", "minutes", "Minutes", "seconds", "Seconds"]);
    }

    const text = String(value).trim();
    if (!text || ["--", "n/a", "na", "not started"].includes(text.toLowerCase())) return null;
    if (/^\d{1,2}:\d{2}(?::\d{2})?$/.test(text)) {
      const parts = text.split(":").map(part => Number.parseFloat(part) || 0);
      if (parts.length === 2) return parts[0] + parts[1] / 60;
      return parts[0] + parts[1] / 60 + parts[2] / 3600;
    }

    const hourMatch = text.match(/([\d.]+)\s*h/i);
    const minuteMatch = text.match(/([\d.]+)\s*m/i);
    const secondMatch = text.match(/([\d.]+)\s*s/i);
    if (hourMatch || minuteMatch || secondMatch) {
      return (hourMatch ? Number.parseFloat(hourMatch[1]) : 0) +
        (minuteMatch ? Number.parseFloat(minuteMatch[1]) / 60 : 0) +
        (secondMatch ? Number.parseFloat(secondMatch[1]) / 3600 : 0);
    }

    const parsed = Number.parseFloat(text);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function firstMetric(operator, keys) {
    for (const key of keys) {
      const parsed = parseMetricValue(operator?.[key]);
      if (parsed !== null) return parsed;
    }
    return null;
  }

  function sessions(operator) {
    return num(
      operator.sessions ??
      operator.Sessions ??
      operator.sessionCount ??
      operator.SessionCount ??
      operator["Sessions"] ??
      operator["Session Count"] ??
      operator["Session_Count"] ??
      operator.collectSessions ??
      operator.collect_sessions ??
      operator.collectedSessions ??
      operator.collected_sessions ??
      operator.CollectSessions ??
      operator.Collect_Sessions ??
      operator.CollectedSessions ??
      operator.Collected_Sessions ??
      operator["Collect Sessions"] ??
      operator["Collected Sessions"] ??
      operator["Collect_Sessions"] ??
      operator["Collected_Sessions"]
    );
  }

  function periodMixSources(operator) {
    return [
      operator.periodMix,
      operator.period_mix,
      operator.PeriodMix,
      operator.Period_Mix,
      operator["Period Mix"],
      operator.periods,
      operator.Periods,
      operator.periodBreakdown,
      operator.period_breakdown,
      operator["Period Breakdown"]
    ].filter(Boolean);
  }

  function entryName(entry) {
    return [
      entry?.color,
      entry?.Color,
      entry?.colour,
      entry?.Colour,
      entry?.name,
      entry?.Name,
      entry?.label,
      entry?.Label,
      entry?.title,
      entry?.Title,
      entry?.key,
      entry?.Key,
      entry?.category,
      entry?.Category,
      entry?.status,
      entry?.Status,
      entry?.period,
      entry?.Period
    ].filter(value => value !== undefined && value !== null).join(" ");
  }

  function includesAny(value, needles) {
    const text = String(value ?? "").toLowerCase();
    return needles.some(needle => text.includes(needle));
  }

  function periodMixMetric(operator, colorNames, labelNames = []) {
    const needles = [...colorNames, ...labelNames].map(value => String(value).toLowerCase());
    for (const source of periodMixSources(operator)) {
      if (Array.isArray(source)) {
        for (const entry of source) {
          if (includesAny(entryName(entry), needles)) {
            const parsed = firstMetric(entry, ["value", "Value", "hours", "Hours", "time", "Time", "duration", "Duration", "total", "Total", "minutes", "Minutes", "seconds", "Seconds"]);
            if (parsed !== null) return parsed;
          }
        }
        continue;
      }

      if (source && typeof source === "object") {
        for (const [key, value] of Object.entries(source)) {
          if (includesAny(key, needles) || includesAny(entryName(value), needles)) {
            const parsed = parseMetricValue(value);
            if (parsed !== null) return parsed;
          }
        }
      }
    }
    return null;
  }

  function operatorHours(operator) {
    const collectedRaw = operator.collectedHours ?? operator["Collected Hours"];
    const evalRaw = operator.EvalHours ?? operator["Eval Hours"] ?? operator.evalHours ?? operator.eval_hours;
    const hasCollectedOrEval = [collectedRaw, evalRaw].some(value => value !== undefined && value !== null && value !== "");
    if (hasCollectedOrEval) return num(collectedRaw) + num(evalRaw);

    const directTotal = operator.totalHours ??
      operator.total_hours ??
      operator.TotalHours ??
      operator["Total Hours"] ??
      operator.total ??
      operator.Total ??
      operator.hours ??
      operator.Hours;
    return num(directTotal);
  }

  function awayTime(operator) {
    return periodMixMetric(operator, ["cyan"], ["away"]) ?? firstMetric(operator, [
      "periodMixCyan", "period_mix_cyan", "PeriodMixCyan", "Period Mix Cyan", "Cyan", "cyan",
      "awayTime", "away_time", "AwayTime", "Away_Time", "Away Time",
      "awayHours", "away_hours", "AwayHours", "Away_Hours", "Away Hours",
      "totalAway", "total_away", "TotalAway", "Total Away", "away", "Away"
    ]);
  }

  function setupTime(operator) {
    return periodMixMetric(operator, ["teal"], ["setup", "block"]) ?? firstMetric(operator, [
      "periodMixTeal", "period_mix_teal", "PeriodMixTeal", "Period Mix Teal", "Teal", "teal",
      "blockTime", "block_time", "BlockTime", "Block_Time", "Block Time",
      "blockHours", "block_hours", "BlockHours", "Block_Hours", "Block Hours",
      "setupTime", "setup_time", "setUpTime", "set_up_time", "SetupTime", "SetUpTime",
      "Setup_Time", "Set_Up_Time", "Setup Time", "Set Up Time",
      "setupHours", "setup_hours", "setUpHours", "set_up_hours", "SetupHours", "SetUpHours",
      "Setup Hours", "Set Up Hours", "setup", "Setup", "setUp", "Set Up", "block", "Block"
    ]);
  }

  function percentFromHours(value, total) {
    if (!Number.isFinite(value) || !Number.isFinite(total) || total <= 0) return null;
    return Math.max(0, Math.min(100, value / total * 100));
  }

  async function normalizeApiPayload(raw) {
    const apiOperators = raw?.collectionOps?.operators || raw?.operators || raw?.data?.operators || [];
    const seenCounts = {};
    const operators = {};

    for (const operator of apiOperators) {
      const name = operator.operator ?? operator.Operator ?? operator.name ?? operator.Name;
      const locker = await lockerForName(name, seenCounts);
      if (!locker) continue;

      const hours = operatorHours(operator);
      const away = percentFromHours(awayTime(operator), hours);
      const setup = percentFromHours(setupTime(operator), hours);

      operators[locker] = {
        locker,
        active: true,
        hours,
        totalHours: hours,
        sessions: sessions(operator),
        ...(away !== null ? { away } : {}),
        ...(setup !== null ? { setup } : {})
      };
    }

    return operators;
  }

  async function readApiOperators() {
    const url = new URL(apiUrl);
    url.searchParams.set("_tmoTs", String(Date.now()));
    const response = await fetch(url.toString(), {
      credentials: "include",
      mode: "cors",
      cache: "no-store"
    });
    if (!response.ok) throw new Error(`Tough Mudder API request failed: ${response.status}`);
    return normalizeApiPayload(await response.json());
  }

  let busy = false;
  async function sendOperatorData() {
    if (busy) return;
    busy = true;

    try {
      const operators = await readApiOperators();
      if (!Object.keys(operators).length) return;
      window.TOUGH_MUDDER_LAST_OPERATOR_DATA = operators;
      frame.contentWindow?.postMessage({
        type: "tough-mudder-operator-progress",
        source: "robohub-api",
        operators
      }, overlayOrigin);
    } catch (error) {
      console.warn("[Tough Mudder Overlay] API data unavailable:", error);
    } finally {
      busy = false;
    }
  }

  frame.addEventListener("load", sendOperatorData);
  sendOperatorData();
  const dataTimer = setInterval(sendOperatorData, 15000);
  closeButton.addEventListener("click", () => clearInterval(dataTimer));
})();
