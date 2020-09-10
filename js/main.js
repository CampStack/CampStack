var gameData = {
  crystals: 0,

  smallDiggerCount: 0,
  smallDiggerBaseCost: 25,
  smallDiggerCost: 25,
  smallDiggerRate: 1,

  largeDiggerCount: 0,
  largeDiggerBaseCost: 200,
  largeDiggerCost: 200,
  largeDiggerRate: 5,

  clickValue: 1,
  upgradeClickCost: 800
}

var costMultiplier = 1.15;

window.setInterval(mainLoop, 1000);
window.setInterval(autoSaveGame, 15000);

function init() {
  var saveGame = JSON.parse(localStorage.getItem("crystalHuntersSave"));
  if(saveGame !== null) {
    gameData = saveGame;
    updateInventory();
    updateDisplay();
  }
}

function mainLoop() {
  gameData.crystals = gameData.crystals + (gameData.smallDiggerCount * gameData.smallDiggerRate) + (gameData.largeDiggerCount * gameData.largeDiggerRate);
  updateDisplay();
}

function autoSaveGame() {
  localStorage.setItem("crystalHuntersSave", JSON.stringify(gameData));
}

function dig() {
  gameData.crystals += gameData.clickValue;
  updateDisplay();
}

function updateDisplay() {
  updateCrystalCountDisplay();
  updateStoreAvailablity();
}

function updateInventory() {
  //Small Digging Machine
  document.getElementById('smallDiggerCount').innerHTML = gameData.smallDiggerCount;
  document.getElementById('smallDiggerCost').innerHTML = gameData.smallDiggerCost;

  //Large Digging Machine
  document.getElementById('largeDiggerCount').innerHTML = gameData.largeDiggerCount;
  document.getElementById('largeDiggerCost').innerHTML = gameData.largeDiggerCost;

  //Click upgrade
  if(gameData.clickValue > 1) {
    document.getElementById('upgradeClick').style.display = 'none';
  }
}

function updateCrystalCountDisplay() {
  document.getElementById('crystalCount').innerHTML = gameData.crystals.toLocaleString();
}

function buySmallDigger() {
  if(gameData.crystals >= gameData.smallDiggerCost) {
    gameData.smallDiggerCount++;
    gameData.crystals = gameData.crystals - gameData.smallDiggerCost;

    gameData.smallDiggerCost = updateItemCost(gameData.smallDiggerBaseCost, gameData.smallDiggerCount);

    updateCrystalCountDisplay();
    document.getElementById('smallDiggerCount').innerHTML = gameData.smallDiggerCount;
    document.getElementById('smallDiggerCost').innerHTML = gameData.smallDiggerCost;
  }
}

function buyLargeDigger() {
  if(gameData.crystals >= gameData.largeDiggerCost) {
    gameData.largeDiggerCount++;
    gameData.crystals = gameData.crystals - gameData.largeDiggerCost;

    gameData.largeDiggerCost = updateItemCost(gameData.largeDiggerBaseCost, gameData.largeDiggerCount);

    updateCrystalCountDisplay();
    document.getElementById('largeDiggerCount').innerHTML = gameData.largeDiggerCount;
    document.getElementById('largeDiggerCost').innerHTML = gameData.largeDiggerCost;
  }
}

function upgradeClick() {
  if(gameData.crystals >= gameData.upgradeClickCost) {
    gameData.crystals = gameData.crystals - gameData.upgradeClickCost;
    gameData.clickValue = 2;

    updateDisplay();
    document.getElementById('upgradeClick').style.display = 'none';
  }
}

function updateItemCost(baseCost, numberOwned) {
  return Math.round(baseCost * Math.pow(costMultiplier, numberOwned));
}

function updateStoreAvailablity() {
  // Check Small Digging Machine
  displayItemAvailability(gameData.smallDiggerCost, "buySmallDigger");

  // Check Large Digging Machine
  displayItemAvailability(gameData.largeDiggerCost, "buyLargeDigger");

  // Check Click Upgrade
  displayItemAvailability(gameData.upgradeClickCost, "upgradeClick");
}

function displayItemAvailability(itemCost, buttonId) {
  var button = document.getElementById(buttonId);

  if(itemCost > gameData.crystals) {
    button.disabled = true;
    button.classList.add("disabled");
  } else {
    button.disabled = false;
    button.classList.remove("disabled");
  }
}
