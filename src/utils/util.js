export const addZero = function(a) {
  if (a < 10) {
    return `0${a}`;
  } else {
    return a;
  }
};

export const formatTime = date => {
  let dateStr =
    addZero(date.getFullYear()) +
    '-' +
    addZero(date.getMonth() + 1) +
    '-' +
    addZero(date.getDate()) +
    ' ' +
    addZero(date.getHours()) +
    ':' +
    addZero(date.getMinutes());
  return dateStr;
};

export function debounce(delay, callback) {
  let lastTime;

  return function() {
    clearTimeout(lastTime);

    const [that, args] = [this, arguments];

    lastTime = setTimeout(() => {
      callback.apply(that, args);
    }, delay);
  };
}

export function observerDomResize(dom, callback) {
  const MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

  const observer = new MutationObserver(callback);

  observer.observe(dom, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true,
  });

  return observer;
}

export function getPolylineLength(points) {
  const lineSegments = new Array(points.length - 1)
    .fill(0)
    .map((foo, i) => [points[i], points[i + 1]]);

  const lengths = lineSegments.map(item => getTwoPointDistance(...item));

  return mulAdd(lengths);
}
export function mulAdd(nums) {
  nums = filterNonNumber(nums);

  return nums.reduce((all, num) => all + num, 0);
}
export function filterNonNumber(array) {
  return array.filter(n => typeof n === 'number');
}
export function getTwoPointDistance(pointOne, pointTwo) {
  const minusX = Math.abs(pointOne[0] - pointTwo[0]);

  const minusY = Math.abs(pointOne[1] - pointTwo[1]);

  return Math.sqrt(minusX * minusX + minusY * minusY);
}

export function deepMerge(target, merged) {
  for (var key in merged) {
    if (target[key] && typeof target[key] === 'object') {
      deepMerge(target[key], merged[key]);

      continue;
    }

    if (typeof merged[key] === 'object') {
      target[key] = deepClone(merged[key], true);

      continue;
    }

    target[key] = merged[key];
  }

  return target;
}

export function deepClone(object, recursion = false) {
  if (!object) return object;

  const { parse, stringify } = JSON;

  if (!recursion) return parse(stringify(object));

  const clonedObj = object instanceof Array ? [] : {};

  if (object && typeof object === 'object') {
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        if (object[key] && typeof object[key] === 'object') {
          clonedObj[key] = deepClone(object[key], true);
        } else {
          clonedObj[key] = object[key];
        }
      }
    }
  }

  return clonedObj;
}
