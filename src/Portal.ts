export class Portal {
  parentNode: SVGElement;
  constructor(parentNode: SVGElement) {
    this.parentNode = parentNode;
  }

  createLineInsidePortal(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    className: string,
    g: SVGElement
  ) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", `${x1}`);
    line.setAttribute("y1", `${y1}`);
    line.setAttribute("x2", `${x2}`);
    line.setAttribute("y2", `${y2}`);
    line.setAttribute("stroke-width", "0.5");
    line.setAttribute("stroke", "white");
    line.classList.add(`${className}`);
    g.appendChild(line);
  }
  init() {
    const portalContainer = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    portalContainer.setAttribute("viewBox", "-200 -60 300 300");

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    portalContainer.appendChild(defs);

    const filter = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "filter"
    );
    filter.setAttribute("id", "glow");
    defs.appendChild(filter);

    const feDropShadow = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feDropShadow"
    );
    feDropShadow.setAttribute("dx", "0");
    feDropShadow.setAttribute("dy", "0");
    feDropShadow.setAttribute("stdDeviation", "1.5");
    feDropShadow.setAttribute("flood-color", "cyan");
    filter.appendChild(feDropShadow);

    const portalBorder = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    portalBorder.setAttribute("cx", "10%");
    portalBorder.setAttribute("cy", "10%");
    portalBorder.setAttribute("r", "40");
    portalBorder.setAttribute("fill", "#6600cc");
    portalBorder.setAttribute("stroke", "cyan");
    portalBorder.setAttribute("style", "filter:url(#glow)");

    this.parentNode.appendChild(portalContainer);
    portalContainer.appendChild(portalBorder);

    const portal = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    portal.setAttribute("cx", "10%");
    portal.setAttribute("cy", "10%");
    portal.setAttribute("r", "30");
    portal.setAttribute("fill", "#1a82dbd6");
    portal.setAttribute("stroke", "cyan");
    portal.setAttribute("style", "filter:url(#glow)");

    this.parentNode.appendChild(portalContainer);
    portalContainer.appendChild(portal);

    const portalCenter = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    portalCenter.setAttribute("cx", "10%");
    portalCenter.setAttribute("cy", "10%");
    portalCenter.setAttribute("r", "3");
    portalCenter.setAttribute("fill", "white");

    this.parentNode.appendChild(portalContainer);
    portalContainer.appendChild(portalCenter);

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    portalContainer.appendChild(g);

    this.createLineInsidePortal(15, 10, 16, 11, "rasengan", g);
    this.createLineInsidePortal(20, 20, 21, 21, "rasengan2", g);
    this.createLineInsidePortal(10, 10, 11, 11, "rasengan3", g);
    this.createLineInsidePortal(40, 10, 40, 11, "rasengan4", g);
    this.createLineInsidePortal(30, 5, 30, 6, "rasengan5", g);
    this.createLineInsidePortal(30, 5, 30, 6, "rasengan6", g);
    this.createLineInsidePortal(12, 42, 13, 43, "rasengan7", g);
    this.createLineInsidePortal(30, 14, 31, 14, "rasengan8", g);
  }
}
