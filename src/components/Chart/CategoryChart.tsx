import { ResponsivePie } from "@nivo/pie";
import { useRecoilValue } from "recoil";
import { categoryChartDatasetState } from "../../store/atom";
import { ChartContainer, ChartTitle, NextButton } from "./GraphAccount";

function CategoryChart ({handleGraph}: any){
  const categoryChartData = useRecoilValue(categoryChartDatasetState); // 차트 데이터
  const today = new Date(); // 오늘 날짜

  return (
    <ChartContainer>
      <ChartTitle>
        {today.getFullYear()}년 카테고리 별 그래프{" "}
        <NextButton type="button" onClick={handleGraph}>
          next
        </NextButton>
      </ChartTitle>
      <ResponsivePie
        data={categoryChartData}
        id="category"
        value="total"
        margin={{ top: 30, right: 80, bottom: 30, left: 55 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "accent" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "column",
            justify: false,
            translateX: 160,
            translateY: -10,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 13,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </ChartContainer>
  );
};

export default CategoryChart;