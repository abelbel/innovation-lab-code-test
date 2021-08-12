import { mount } from "enzyme";
import App from "../pages/index";
import { waitForComponentToPaint } from "../helpers";

const TEST_DOGS = [
  {
    id: "1",
    url: "https://random.dog/428711bd-7381-4998-a4b5-47b682c95b1b.jpg",
    caption: "This is a dog of type JPG",
  },
  {
    id: "2",
    url: "https://random.dog/beb6b751-ae55-4aa5-9255-41a6a666b6e2.png",
    caption: "This is a dog of type PNG",
  },
  {
    id: "3",
    url: "https://random.dog/c6f5f13e-1c2c-4779-991e-ccaf46441454.gif",
    caption: "This is a dog of type GIF",
  },
  {
    id: "4",
    url: "https://random.dog/140185e8-eeb4-4855-bf50-625ab81a6e46.mp4",
    caption: "This is a dog of type MP4",
  },
];

describe("Gallery page", () => {
  it("renders no gallery item if getDogs() returns and empty array", () => {
    const wrapper = mount(<App dogs={[]} />);
    expect(wrapper.find('[data-test-id="gallery-item"]')).toHaveLength(0);
  });

  it("renders at least one (1) gallery item if getDogs() returns a non-empty array", () => {
    const wrapper = mount(
      <App
        dogs={[
          {
            id: "1",
            url: "https://random.dog/5a4f5744-0cf1-4be8-8fb3-3ec7f1cb611d.mp4",
            caption: "A test dog!",
          },
        ]}
      />
    );
    expect(wrapper.find('[data-test-id="gallery-item"]')).not.toHaveLength(0);
  });
});

describe("Filter gallery items", () => {
  it("by caption using the filter input", async () => {
    const wrapper = mount(<App dogs={TEST_DOGS} />);

    const testFilter = "dog";
    wrapper
      .find('input[data-test-id="filter-input"]')
      .simulate("change", { target: { value: testFilter } });
    await waitForComponentToPaint(wrapper);
    const galleryItems = wrapper.find('[data-test-id="gallery-item"] h3');
    galleryItems.forEach((node) => {
      expect(node.text()).toContain(testFilter);
    });
  });

  it("by file type (jpg) using the sort select", async () => {
    const wrapper = mount(<App dogs={TEST_DOGS} />);

    const fileTypes = ["jpg", "png", "gif", "mp4"];

    fileTypes.forEach(async (fileType) => {
      wrapper
        .find('select[data-test-id="sort-select"]')
        .simulate("change", { target: { value: fileType } });
      await waitForComponentToPaint(wrapper);
      const imgItems = wrapper.find('[data-test-id="gallery-item"] img');
      const videoItems = wrapper.find('[data-test-id="gallery-item"] video');

      imgItems.forEach((node) => {
        expect(node.prop("src")).toContain(fileType);
      });
      videoItems.forEach((node) => {
        expect(node.prop("src")).toContain(fileType);
      });
    });
  });
});
