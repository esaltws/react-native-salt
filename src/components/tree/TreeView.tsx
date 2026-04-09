import React, { useState } from "react";
import {
  View,
  Pressable,
  LayoutAnimation,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

type TreeNode = {
  key: string;
  label: string;
  icon?: string;
  children?: TreeNode[];
  data?: any;
};

type Props = {
  nodes: TreeNode[];
  expandedKeys?: string[];
  onToggle?: (key: string) => void;
  onSelect?: (node: TreeNode) => void;
  selectedKey?: string;
  indentWidth?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

function TreeNodeItem({
  node,
  depth,
  expandedKeys,
  onToggle,
  onSelect,
  selectedKey,
  indentWidth,
}: {
  node: TreeNode;
  depth: number;
  expandedKeys: Set<string>;
  onToggle: (key: string) => void;
  onSelect?: (node: TreeNode) => void;
  selectedKey?: string;
  indentWidth: number;
}) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedKeys.has(node.key);
  const isSelected = selectedKey === node.key;

  const handlePress = () => {
    if (hasChildren) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      onToggle(node.key);
    }
    onSelect?.(node);
  };

  return (
    <View>
      <Pressable
        onPress={handlePress}
        style={[
          styles.nodeRow,
          {
            paddingLeft: depth * indentWidth + spacing.sm,
            paddingVertical: spacing.sm,
            paddingRight: spacing.md,
            borderRadius: radius.sm,
            backgroundColor: isSelected
              ? `${colors.primary}12`
              : "transparent",
          },
        ]}
      >
        {/* Expand/collapse icon */}
        <View style={{ width: 24, alignItems: "center" }}>
          {hasChildren ? (
            <Icon
              name={
                isExpanded
                  ? "chevron-down-outline"
                  : "chevron-forward-outline"
              }
              size={16}
              color={colors.muted}
            />
          ) : (
            <View style={{ width: 16 }} />
          )}
        </View>

        {/* Node icon */}
        {node.icon && (
          <Icon
            name={node.icon}
            size={18}
            color={isSelected ? colors.primary : colors.text}
            style={{ marginRight: spacing.sm }}
          />
        )}

        {/* Label */}
        <Text
          style={{
            flex: 1,
            fontSize: fontSizes.sm,
            color: isSelected ? colors.primary : colors.text,
            fontWeight: isSelected ? "600" : hasChildren ? "500" : "400",
          }}
          numberOfLines={1}
        >
          {node.label}
        </Text>

        {/* Child count */}
        {hasChildren && (
          <Text
            style={{
              fontSize: fontSizes.xs,
              color: colors.muted,
              marginLeft: spacing.sm,
            }}
          >
            {node.children!.length}
          </Text>
        )}
      </Pressable>

      {/* Children */}
      {hasChildren && isExpanded && (
        <View>
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.key}
              node={child}
              depth={depth + 1}
              expandedKeys={expandedKeys}
              onToggle={onToggle}
              onSelect={onSelect}
              selectedKey={selectedKey}
              indentWidth={indentWidth}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default function TreeView({
  nodes,
  expandedKeys: controlledKeys,
  onToggle: controlledToggle,
  onSelect,
  selectedKey,
  indentWidth = 20,
  style,
  testID,
}: Props) {
  const [internalKeys, setInternalKeys] = useState<string[]>([]);

  const isControlled = controlledKeys !== undefined;
  const expandedSet = new Set(isControlled ? controlledKeys : internalKeys);

  const handleToggle = (key: string) => {
    if (isControlled) {
      controlledToggle?.(key);
    } else {
      setInternalKeys((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      );
    }
  };

  return (
    <View testID={testID} style={style}>
      {nodes.map((node) => (
        <TreeNodeItem
          key={node.key}
          node={node}
          depth={0}
          expandedKeys={expandedSet}
          onToggle={handleToggle}
          onSelect={onSelect}
          selectedKey={selectedKey}
          indentWidth={indentWidth}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  nodeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
