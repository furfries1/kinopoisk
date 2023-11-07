export function createPages(
  pages: number[],
  pagesCount: number,
  currentPage: number
) {
  if (pagesCount > 10) {
    if (currentPage > 5) {
      for (let i = currentPage - 4; i <= currentPage + 5; i++) {
        pages.push(i);
        if (i === pagesCount) break;
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        pages.push(i);
        if (i === pagesCount) break;
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  }
}

export const getRatingColor = (rating: number) => {
  if (rating >= 7) {
    return "green";
  } else if (rating >= 5) {
    return "yellow";
  } else if (rating < 5 && rating > 0) {
    return "red";
  } else return "hide";
};

export const getRatingColorPerson = (rating: number) => {
  if (rating >= 7) {
    return "green-person";
  } else if (rating >= 5) {
    return "yellow-person";
  } else if (rating < 5 && rating > 0) {
    return "red-person";
  }
};

export const sortByArr = [
  {
    value: "RATING",
    label: "рейтинг",
  },
  {
    value: "YEAR",
    label: "год",
  },
  {
    value: "NUM_VOTE",
    label: "количество голосов",
  },
];

export const filterType = [
  {
    value: "FILM",
    label: "фильмы",
  },
  {
    value: "TV_SHOW",
    label: "ТВ-шоу",
  },
  {
    value: "TV_SERIES",
    label: "сериалы",
  },
  {
    value: "MINI_SERIES",
    label: "мини-сериалы",
  },
  {
    value: "ALL",
    label: "все",
  },
];

export const filterRatingArr = [
  {
    value: 1,
    label: 1,
  },
  {
    value: 2,
    label: 2,
  },
  {
    value: 3,
    label: 3,
  },
  {
    value: 4,
    label: 4,
  },
  {
    value: 5,
    label: 5,
  },
  {
    value: 6,
    label: 6,
  },
  {
    value: 7,
    label: 7,
  },
  {
    value: 8,
    label: 8,
  },
  {
    value: 9,
    label: 9,
  },
  {
    value: 10,
    label: 10,
  },
];

const base64UrlDecode = (base64Url: string) => {
  const padding = "=".repeat((4 - (base64Url.length % 4)) % 4);
  const base64 = (base64Url + padding).replace(/-/g, "+").replace(/_/g, "/");
  const decoded = atob(base64);
  return Array.from(decoded).map((char) => char.charCodeAt(0));
};

export const decodeJwt = (jwtToken: string) => {
  const [headerBase64Url, payloadBase64Url, signatureBase64Url] =
    jwtToken.split(".");
  const header = JSON.parse(
    String.fromCharCode(...base64UrlDecode(headerBase64Url))
  );
  const payload = JSON.parse(
    String.fromCharCode(...base64UrlDecode(payloadBase64Url))
  );
  return { header, payload };
};

export const expToMinutes = (expTimestampInSeconds: number) => {
  const expTimestampInMillis = expTimestampInSeconds * 1000;
  const currentTimeInMillis = Date.now();
  const timeDifferenceInMillis = expTimestampInMillis - currentTimeInMillis;
  const timeDifferenceInMinutes = timeDifferenceInMillis / 60000;
  return timeDifferenceInMinutes;
};

export const updateAccessToken = () => {
  try {
    let refresh = localStorage.getItem("refresh");
    fetch("https://studapi.teachmeskills.by/auth/jwt/refresh/", {
      method: "POST",
      body: JSON.stringify({ refresh }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then(({ access }) => {
        if (access) {
          console.log(access);
          localStorage.setItem("access", access);
          console.log("Access token has been updated");
        }
      });
  } catch (err) {
    console.log(err);
  }
};
