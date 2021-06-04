export const contentCounts = (content) => {
  const summary = {
    total_count: content.length,
    contents: { module: 0, role: 0, plugin: 0 }
  };

  for (const c of content) {
    if (c.content_type === 'role') {
      summary.contents.role++;
    } else if (c.content_type === 'module') {
      summary.contents.module++;
    } else {
      summary.contents.plugin++;
    }
  }

  return summary;
};
